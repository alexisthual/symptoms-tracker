import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  headacheStates,
  feverStates,
  coughStates,
  breathingStates,
  throatStates,
  diarrheaStates,
  feedingStates,
  hypertensionStates,
  diabetesStates,
  cancerStates,
  pneumoStates,
  dialyseStates,
  liverStates,
  immunoStates
} from "../../types";

@Entity()
export class Submission {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("timestamp")
  submittedAt: number;

  @Column("smallint")
  age: number;

  // TODO: this won't be true for countries like UK, Canada
  @Column("integer")
  zipcode: number;

  @Column({
    type: "enum",
    enum: headacheStates
  })
  headache: headacheStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  headacheSince: number;

  @Column({
    type: "enum",
    enum: throatStates
  })
  throat: throatStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  throatSince: number;

  @Column({
    type: "enum",
    enum: diarrheaStates
  })
  diarrhea: diarrheaStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  diarrheaSince: number;

  @Column({
    type: "enum",
    enum: feedingStates
  })
  feeding: feedingStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  feedingSince: number;

  @Column({
    type: "enum",
    enum: feverStates
  })
  fever: feverStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  feverSince: number;

  @Column({
    type: "enum",
    enum: coughStates,
    nullable: true
  })
  cough: coughStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  coughSince: number;

  @Column({
    type: "enum",
    enum: breathingStates
  })
  breathing: breathingStates;

  @Column({
    type: "smallint",
    nullable: true
  })
  breathingSince: number;

  @Column({
    type: "integer",
    nullable: true
  })
  height: number;

  @Column({
    type: "integer",
    nullable: true
  })
  weight: number;

  @Column({
    type: "enum",
    enum: hypertensionStates,
    nullable: true
  })
  hypertension: hypertensionStates;

  @Column({
    type: "enum",
    enum: diabetesStates,
    nullable: true
  })
  diabetes: diabetesStates;

  @Column({
    type: "enum",
    enum: cancerStates,
    nullable: true
  })
  cancer: cancerStates;

  @Column({
    type: "enum",
    enum: pneumoStates,
    nullable: true
  })
  pneumo: pneumoStates;

  @Column({
    type: "enum",
    enum: dialyseStates,
    nullable: true
  })
  dialyse: dialyseStates;

  @Column({
    type: "enum",
    enum: liverStates,
    nullable: true
  })
  liver: liverStates;

  @Column({
    type: "enum",
    enum: immunoStates,
    nullable: true
  })
  immuno: immunoStates;

  @Column({
    type: "integer",
    nullable: true
  })
  confined: number;
}
