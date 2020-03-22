const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

import {
  ageCategories,
  headacheStates,
  feverStates,
  breathingStates
} from "./types";

class Symptom extends Model {}
Symptom.init(
  {
    age: {
      type: DataTypes.STRING,
      validate: {
        isIn: Object.values(ageCategories)
      }
    },
    zipcode: DataTypes.STRING,
    headache: {
      type: DataTypes.STRING,
      validate: {
        isIn: headacheStates
      }
    },
    headacheSince: DataTypes.INTEGER,
    fever: {
      type: DataTypes.STRING,
      validate: {
        isIn: feverStates
      }
    },
    feverSince: DataTypes.INTEGER,
    breathing: {
      type: DataTypes.STRING,
      validate: {
        isIn: breathingStates
      }
    },
    breathingSince: DataTypes.INTEGER
  },
  { sequelize, modelName: "symptom" }
);

module.exports = {
  sequelize,
  Symptom
};
