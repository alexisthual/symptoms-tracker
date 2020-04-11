import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  sinceStates,
  headacheStates,
  feverStates,
  coughStates,
  breathingStates,
  throatStates,
  diarrheaStates,
  feedingStates,
  tasteAndSmellStates,
  covidTestStates,
  covidResultStates,
  healthStates,
  ageCategories
} from "../../types";

@Entity()
export class Submission {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("timestamp")
  submittedAt: Date;

  // DEMOGRAPHIC QUESTIONS

  @Column({
    type: "enum",
    enum: ageCategories
  })
  age: ageCategories;

  // TODO: this won't be true for countries like UK, Canada
  @Column({
    type: "integer",
    nullable: true
  })
  zipcode: number;

  @Column("integer")
  confinedWith: number;

  @Column({
    type: "enum",
    enum: healthStates
  })
  health: healthStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  recoveredSince: number;

  // SYMPTOMS

  @Column({
    type: "enum",
    enum: feverStates,
    nullable: true
  })
  fever: feverStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  feverSince: sinceStates;

  @Column({
    type: "enum",
    enum: coughStates,
    nullable: true
  })
  cough: coughStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  coughSince: sinceStates;

  @Column({
    type: "enum",
    enum: tasteAndSmellStates,
    nullable: true
  })
  tasteAndSmell: tasteAndSmellStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  tasteAndSmellSince: sinceStates;

  @Column({
    type: "enum",
    enum: throatStates,
    nullable: true
  })
  throat: throatStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  throatSince: sinceStates;

  @Column({
    type: "enum",
    enum: diarrheaStates,
    nullable: true
  })
  diarrhea: diarrheaStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  diarrheaSince: sinceStates;

  @Column({
    type: "enum",
    enum: headacheStates,
    nullable: true
  })
  headache: headacheStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  headacheSince: sinceStates;

  @Column({
    type: "enum",
    enum: feedingStates,
    nullable: true
  })
  feeding: feedingStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  feedingSince: sinceStates;

  @Column({
    type: "enum",
    enum: breathingStates,
    nullable: true
  })
  breathing: breathingStates;

  @Column({
    type: "enum",
    enum: sinceStates,
    nullable: true
  })
  breathingSince: sinceStates;

  // OPTIONAL QUESTIONS

  @Column({
    type: "enum",
    enum: covidTestStates,
    nullable: true
  })
  covidTest: covidTestStates;

  @Column({
    type: "enum",
    enum: covidResultStates,
    nullable: true
  })
  covidResult: covidResultStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  bmi: number;

  @Column({
    type: "boolean",
    nullable: true
  })
  hypertension: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  diabetes: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  cancer: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  pneumo: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  dialyse: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  liver: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  pregnant: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  immuno: boolean;

  @Column({
    type: "boolean",
    nullable: true
  })
  immunoSuppressor: boolean;
}
