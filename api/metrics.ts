import { NowRequest, NowResponse } from "@now/node";

import { connect } from "../lib/db";
import { Metrics } from "../lib/db/entities/metrics";

module.exports = async (req: NowRequest, res: NowResponse) => {
  if (req.method === "GET") {
    const connection = await connect();

    const metricsRepository = connection.getRepository(Metrics);
    metricsRepository
      .find({
        take: 1,
        order: {
          createdAt: "DESC"
        },
        cache: true
      })
      .then((metricsArray: Metrics[]) => {
        res.status(200).json({
          metrics: metricsArray[0]
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
