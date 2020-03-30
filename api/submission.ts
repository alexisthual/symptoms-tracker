import { connect } from "../lib/db";
import { Submission } from "../lib/db/entities/submission";

const zipcodes = require("../zipcodes/france/closest_zip");

module.exports = async (req: any, res: any) => {
  if (req.method === "POST") {
    const connection = await connect();
    const zipcode = req.body.zipcode;

    if (zipcode.toString() in zipcodes) {
      const submissionRepository = connection.getRepository(Submission);
      submissionRepository
        .save({
          // Blur zipcode
          ...req.body,
          zipcode: Number(zipcodes[zipcode])
        })
        .then(() => {
          res.status(200).json({
            status: "success"
          });
        })
        .catch((error: any) => {
          console.log(error);
          res.status(501).json({
            status: "error",
            error
          });
        });
    } else {
      res.status(200).json({
        status: "error",
        message: "Zipcode is not valid."
      });
    }
  } else {
    res.status(404).json({
      message: "Unsupported request type."
    });
  }
};
