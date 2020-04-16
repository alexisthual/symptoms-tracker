import { NowRequest, NowResponse } from "@now/node";
import Memcached from "memcached";

import { connect } from "../lib/db";
import { Submission } from "../lib/db/entities/submission";
// import { Metrics } from "../lib/db/entities/metrics";

const departementToRegion = require("../zipcodes/departementToRegion.json");
const regionToPopulation = require("../zipcodes/regionToPopulation.json");

module.exports = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "GET") {
    const connection = await connect();

    const date = new Date(Date.now());
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    connection
      .getRepository(Submission)
      .find({
        select: ["zipcode"],
        where: { submittedAt: date }
      })
      .then((submissions: Submission[]) => {
        const regions = submissions
          .filter((submission: Submission) => submission.zipcode > 0)
          .map(
            (submission: Submission) =>
              departementToRegion[
                Math.round(submission.zipcode / 1000).toString()
              ]
          );

        const regionsAcc = {};
        regions.forEach((region: string) => {
          if (region in regionsAcc) {
            regionsAcc[region] = regionsAcc[region] + 1;
          } else {
            regionsAcc[region] = 1;
          }
        });

        for (const region in regionsAcc) {
          regionsAcc[region] = regionsAcc[region] / regionToPopulation[region];
        }

        // TODO store regionsAcc

        res.status(200).json({
          message: "Done"
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
