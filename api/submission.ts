import { connect } from "../lib/db";
import { Submission } from "../lib/db/entities/submission";

module.exports = async (req: any, res: any) => {
  if (req.method === "POST") {
    const connection = await connect();

    const submissionRepository = connection.getRepository(Submission);
    submissionRepository
      .save(req.body)
      .then(() => {
        res.status(200).end();
      })
      .catch((error: any) => {
        console.log(error);
        res.status(501).end(error);
      });
  } else {
    res.status(404).end();
  }
};
