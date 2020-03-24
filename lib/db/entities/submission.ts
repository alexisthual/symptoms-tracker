import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  headacheStates,
  feverStates,
  coughStates,
  breathingStates
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
}
