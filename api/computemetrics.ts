import { NowRequest, NowResponse } from "@now/node";

import { connect } from "../lib/db";
import { Submission } from "../lib/db/entities/submission";
import { Metrics } from "../lib/db/entities/metrics";

module.exports = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "GET") {
    const connection = await connect();

    const date = new Date(Date.now());
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const submissionRepository = connection.getRepository(Submission);
    submissionRepository
      .count({ submittedAt: date })
      .then(async (n: number) => {
        const metricsRepository = connection.getRepository(Metrics);
        await metricsRepository.save({ total: n });

        res.status(200).json({
          n
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
