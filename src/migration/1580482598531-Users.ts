import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1580482598531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "email",
            type: "varchar(254)",
            isUnique: true
          },
          { name: "password", type: "varchar(254)" },
          { name: "first_name", type: "varchar(254)" },
          { name: "last_name", type: "varchar(254)" },
          { name: "birthday", type: "timestamp" },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "deleted_at",
            type: "timestamp",
            default: null,
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
  }
}
