import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";

export class articles1583135976572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "articles",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "title",
            type: "varchar(254)",
            isUnique: true
          },
          { name: "subtitle", type: "text" },
          { name: "body", type: "text" },
          { name: "author_id", type: "int" },
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

    await queryRunner.createForeignKey(
      "articles",
      new TableForeignKey({
        columnNames: ["author_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const articles = await queryRunner.getTable("articles");
    if (articles) {
      const categoryForeignKey1 = articles.foreignKeys.find(
        fk => fk.columnNames.indexOf("author_id") !== -1
      );
      if (categoryForeignKey1) {
        await queryRunner.dropForeignKey("articles", categoryForeignKey1);
      }
    }
    await queryRunner.dropTable("articles");
  }
}
