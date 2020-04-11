import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

@Entity()
export class Metrics {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column("int")
  total: number;
}
