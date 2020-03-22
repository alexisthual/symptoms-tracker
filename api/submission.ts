import { connect } from "../db";
import { Submission } from "../db/entities/submission";

module.exports = async (req: any, res: any) => {
  if (req.method === "POST") {
    console.log(req.body);

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
