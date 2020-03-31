import { NowRequest, NowResponse } from "@now/node";

import { connect } from "../lib/db";
import { Captcha } from "../lib/db/entities/captcha";
import { Submission } from "../lib/db/entities/submission";

const zipcodes = require("../zipcodes/france/closest_zip");

module.exports = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "POST") {
    const connection = await connect();

    if (req.body.captcha && req.body.captcha.answer) {
      const captchaRepository = connection.getRepository(Captcha);

      captchaRepository
        .findOne(req.body.captcha.id)
        .then((captcha: Captcha) => {
          if (captcha.text === req.body.captcha.answer) {
            const zipcode = req.body.submission.zipcode;
            const submissionRepository = connection.getRepository(Submission);

            submissionRepository
              .save({
                // Blur zipcode
                ...req.body.submission,
                zipcode:
                  zipcode.toString() in zipcode
                    ? Number(zipcodes[zipcode])
                    : null
              })
              .then(() => {
                res.status(200).json({
                  status: "success"
                });
              })
              .catch((error: any) => {
                console.log(error);
                res.status(500).json({
                  status: "error",
                  message: "Could not write submission",
                  error
                });
              });
          } else {
            console.log(
              `Invalid Captcha answer: ${captcha.text} (truth) !== ${req.body.captcha.answer} (submission)`
            );
            res.status(500).json({
              status: "error",
              message: "Invalid Captcha answer."
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
          res.status(500).json({
            status: "error",
            message: "Could not find Captcha id",
            error: error
          });
        });
    } else {
      console.log("Missing captcha");
      res.status(500).json({
        status: "error",
        message: "Invalid Captcha",
        error: "Missing Captcha."
      });
    }
  } else {
    console.log(`Unsupported request type: ${req.method}`);
    res.status(501).json({
      message: "Unsupported request type."
    });
  }
};
