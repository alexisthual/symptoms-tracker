"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var types_1 = require("../../types");
var Submission = /** @class */ (function() {
  function Submission() {}
  __decorate(
    [typeorm_1.PrimaryGeneratedColumn("uuid")],
    Submission.prototype,
    "id"
  );
  __decorate(
    [typeorm_1.Column("timestamp")],
    Submission.prototype,
    "submittedAt"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.ageCategories
      })
    ],
    Submission.prototype,
    "age"
  );
  __decorate([typeorm_1.Column("integer")], Submission.prototype, "zipcode");
  __decorate(
    [typeorm_1.Column("integer")],
    Submission.prototype,
    "confinedWith"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.healthStates
      })
    ],
    Submission.prototype,
    "health"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "smallint",
        nullable: true
      })
    ],
    Submission.prototype,
    "recoveredSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.feverStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "fever"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "feverSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.coughStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "cough"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "coughSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.tasteAndSmellStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "tasteAndSmell"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "tasteAndSmellSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.throatStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "throat"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "throatSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.diarrheaStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "diarrhea"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "diarrheaSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.headacheStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "headache"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "headacheSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.feedingStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "feeding"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "feedingSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.breathingStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "breathing"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.sinceStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "breathingSince"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.covidTestStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "covidTest"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "enum",
        enum: types_1.covidResultStates,
        nullable: true
      })
    ],
    Submission.prototype,
    "covidResult"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "integer",
        nullable: true
      })
    ],
    Submission.prototype,
    "imc"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "hypertension"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "diabetes"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "cancer"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "pneumo"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "dialyse"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "liver"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "pregnant"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "immuno"
  );
  __decorate(
    [
      typeorm_1.Column({
        type: "boolean",
        nullable: true
      })
    ],
    Submission.prototype,
    "immunoSuppressor"
  );
  Submission = __decorate([typeorm_1.Entity()], Submission);
  return Submission;
})();
exports.Submission = Submission;
