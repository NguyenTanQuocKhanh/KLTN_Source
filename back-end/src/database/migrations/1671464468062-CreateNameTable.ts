import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable1671464468062 implements MigrationInterface {
  name = 'CreateNameTable1671464468062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "link"`);
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "fullName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "phoneNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "address" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "isDefault" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "banner" ADD "type" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "link" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "order" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE "banner" ADD "photoId" uuid`);
    await queryRunner.query(`ALTER TABLE "banner" ADD "statusId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207eadbaa38ce8cf4625642519"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5198460192ebbd084ffbb5aebd"`,
    );
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "link"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "isDefault"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "fullName"`);
    await queryRunner.query(`ALTER TABLE "banner" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "link" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "banner" ADD "statusId" integer`);
    await queryRunner.query(`ALTER TABLE "banner" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "banner" ADD "order" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE "banner" ADD "type" integer NOT NULL`);
    await queryRunner.query(
      `CREATE INDEX "IDX_207eadbaa38ce8cf4625642519" ON "brands_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5198460192ebbd084ffbb5aebd" ON "brands_categories" ("brandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_b8cbc3e8c3efd6dca51ab58ee40" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_069dddfdc9b2255d633a27e3b17" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
