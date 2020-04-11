import { NowRequest, NowResponse } from "@now/node";
import svgCaptcha from "svg-captcha";

import { connect } from "../lib/db";
import { Captcha } from "../lib/db/entities/captcha";

module.exports = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "GET") {
    const connection = await connect();
    var captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: "0oO1iLlI",
      noise: 3
    });

    const captchaRepository = connection.getRepository(Captcha);
    captchaRepository
      .save({
        text: captcha.text
      })
      .then((entry: Captcha) => {
        res.status(200).json({
          id: entry.id,
          data: captcha.data
        });
      })
      .catch((error: any) => {
        res.status(500).json({
          error
        });
      });
  } else {
    res.status(501).json({
      message: "Unsupported request type."
    });
  }
};
