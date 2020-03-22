import { sequelize, Symptom } from "../../lib/db";

module.exports = async (req, res) => {
  try {
    await sequelize.sync();
    const jane = await Symptom.create(req.body);

    res.json(jane.toJSON());
  } catch (e) {
    console.log(e);
    res.json({ error: 1 });
  }
};
