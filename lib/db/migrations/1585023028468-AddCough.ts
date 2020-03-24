import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

import { coughStates } from "../../types";

export class AddCough1585023028468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      "submission",
      new TableColumn({
        name: "cough",
        type: "enum",
        enum: Object.values(coughStates),
        isNullable: true
      })
    );
    await queryRunner.addColumn(
      "submission",
      new TableColumn({
        name: "coughSince",
        type: "smallint",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn("submission", "cough");
    await queryRunner.dropColumn("submission", "coughSince");
  }
}
