const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

class Symptom extends Model {}
Symptom.init(
  {
    age: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    headache: DataTypes.STRING,
    headacheSince: DataTypes.STRING,
    fever: DataTypes.STRING,
    feverSince: DataTypes.STRING,
    breathing: DataTypes.STRING,
    breathingSince: DataTypes.STRING
  },
  { sequelize, modelName: "symptom" }
);

exports.sequelize = sequelize;
exports.Symptom = Symptom;
