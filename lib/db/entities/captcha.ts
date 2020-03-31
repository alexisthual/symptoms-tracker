import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Captcha {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("varchar")
  text: string;
}
