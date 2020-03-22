import { sequelize, Symptom } from "../../lib/db";

module.exports = async (req, res) => {
  await sequelize.sync();
  const jane = await Symptom.create(req.body);

  res.json(jane.toJSON());
};
