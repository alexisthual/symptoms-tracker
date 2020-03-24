import { connect } from "../lib/db";
import { Submission } from "../lib/db/entities/submission";

module.exports = async (req: any, res: any) => {
  if (req.method === "POST") {
    const connection = await connect();

    const submissionRepository = connection.getRepository(Submission);
    submissionRepository
      .save(req.body)
      .then(() => {
        res.status(200).json({
          message: "success"
        });
      })
      .catch((error: any) => {
        console.log(error);
        res.status(501).json({
          message: "error",
          error
        });
      });
  } else {
    res.status(404).json({
      message: "unsupported request type"
    });
  }
};
