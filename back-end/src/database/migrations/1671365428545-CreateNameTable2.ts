import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNameTable21671365428545 implements MigrationInterface {
  name = 'CreateNameTable21671365428545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "type" character varying, "duration" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banner" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" integer NOT NULL, "link" character varying, "order" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "statusId" integer, CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying, "logoId" uuid, "statusId" integer, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "totalProduct" integer NOT NULL DEFAULT '0', "slug" character varying, "logoId" uuid, "imageId" uuid, "statusId" integer, CONSTRAINT "REL_062524ac7f03786e461134ea62" UNIQUE ("imageId"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brands_categories" ("brandId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_b48fcd532fd89479dc81cd6e141" PRIMARY KEY ("brandId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "product" jsonb NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, "price" integer NOT NULL, "priceBeforeDiscount" integer, "quantity" integer NOT NULL, "discount" integer, CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('unpaid', 'pending', 'aborted', 'successful')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "totalAmount" integer NOT NULL, "totalAmountBeforeDiscount" integer, "userId" character varying NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'unpaid', "note" character varying NOT NULL, "address" character varying, "paymentMethod" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "parent" character varying, "priceBeforeDiscount" integer NOT NULL, "stock" integer NOT NULL, "sold" integer NOT NULL DEFAULT '0', "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "username" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "fullName" character varying, "birthday" TIMESTAMP, "gender" integer, "phoneNumber" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_035190f70c9aff0ef331258d28" ON "user" ("fullName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tier_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, CONSTRAINT "PK_f77960fd789d2b9a4f95db87050" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "likedCount" integer NOT NULL DEFAULT '0', "discount" integer NOT NULL, "stock" integer NOT NULL DEFAULT '0', "price" integer NOT NULL, "priceBeforeDiscount" integer NOT NULL, "sold" integer NOT NULL DEFAULT '0', "keywords" jsonb, "params" jsonb DEFAULT '{}', "slug" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imageId" uuid, "statusId" integer, "categoriesId" integer, "brandId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "user" jsonb NOT NULL, "product" jsonb NOT NULL, "rating" integer NOT NULL, "productQuality" character varying, "trueToDescription" character varying, "review" character varying, "statusId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_banners" ("categoriesId" integer NOT NULL, "bannerId" integer NOT NULL, CONSTRAINT "PK_c8537c6dc0a54f7a9628c9c86b7" PRIMARY KEY ("categoriesId", "bannerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1b6389225cc7d56b57bdb207d" ON "categories_banners" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e50ee303ec1070fd4bc4461d36" ON "categories_banners" ("bannerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tierModel_model" ("tierModelId" uuid NOT NULL, "modelId" uuid NOT NULL, CONSTRAINT "PK_c805984eb3dc4559472b0a06f06" PRIMARY KEY ("tierModelId", "modelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f826b542e381e60f89787ab16a" ON "tierModel_model" ("tierModelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a8ec38e2bc9efdd8c551f6850" ON "tierModel_model" ("modelId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_images_file" ("productId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d878e77f31198d8add91dfdbb78" PRIMARY KEY ("productId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3841db663ef502a0a33e6b7cdf" ON "product_images_file" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_697f1706bb9245dee6f7694f12" ON "product_images_file" ("fileId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_tierModel" ("productId" integer NOT NULL, "tierModelId" uuid NOT NULL, CONSTRAINT "PK_8de70800dfb470509f4a56a6774" PRIMARY KEY ("productId", "tierModelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b82a2e77714d67ed2f3fd404f" ON "product_tierModel" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3bfae9d6f312c193f2c715a8da" ON "product_tierModel" ("tierModelId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "likes" ("productId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a4a87b8e1155983bef474c7ddfe" PRIMARY KEY ("productId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_36096625e9a713d7b1f8d34eea" ON "likes" ("productId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cfd8e81fac09d7339a32e57d90" ON "likes" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews_files_file" ("reviewsId" integer NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_d33bb7c14601d938e084d5d08ac" PRIMARY KEY ("reviewsId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a40a1d604fa6427773147fee2" ON "reviews_files_file" ("reviewsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_596ad21c1604113208b389f94d" ON "reviews_files_file" ("fileId") `,
    );
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
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_3f43543ba2a8716cc5d3dd58ae8" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_a01a568fbbff540189390c77704" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc" FOREIGN KEY ("logoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_062524ac7f03786e461134ea624" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" ADD CONSTRAINT "FK_cac03b34b156594338414182c71" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model" ADD CONSTRAINT "FK_3386c1c0dba4b5faaf69ea648c3" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b1b332c0f436897f21a960f26c7" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_ba7c2d4620cd7088e74e3ba84ad" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_a1b6389225cc7d56b57bdb207d6" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" ADD CONSTRAINT "FK_e50ee303ec1070fd4bc4461d362" FOREIGN KEY ("bannerId") REFERENCES "banner"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" ADD CONSTRAINT "FK_207eadbaa38ce8cf46256425195" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tierModel_model" ADD CONSTRAINT "FK_f826b542e381e60f89787ab16ab" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tierModel_model" ADD CONSTRAINT "FK_4a8ec38e2bc9efdd8c551f68504" FOREIGN KEY ("modelId") REFERENCES "model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" ADD CONSTRAINT "FK_697f1706bb9245dee6f7694f12c" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tierModel" ADD CONSTRAINT "FK_5b82a2e77714d67ed2f3fd404ff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tierModel" ADD CONSTRAINT "FK_3bfae9d6f312c193f2c715a8da2" FOREIGN KEY ("tierModelId") REFERENCES "tier_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" ADD CONSTRAINT "FK_7a40a1d604fa6427773147fee24" FOREIGN KEY ("reviewsId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" ADD CONSTRAINT "FK_596ad21c1604113208b389f94d3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" DROP CONSTRAINT "FK_596ad21c1604113208b389f94d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews_files_file" DROP CONSTRAINT "FK_7a40a1d604fa6427773147fee24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`,
    );
    await queryRunner.query(
      `ALTER TABLE "likes" DROP CONSTRAINT "FK_36096625e9a713d7b1f8d34eea0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tierModel" DROP CONSTRAINT "FK_3bfae9d6f312c193f2c715a8da2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_tierModel" DROP CONSTRAINT "FK_5b82a2e77714d67ed2f3fd404ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_697f1706bb9245dee6f7694f12c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_images_file" DROP CONSTRAINT "FK_3841db663ef502a0a33e6b7cdf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tierModel_model" DROP CONSTRAINT "FK_4a8ec38e2bc9efdd8c551f68504"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tierModel_model" DROP CONSTRAINT "FK_f826b542e381e60f89787ab16ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_207eadbaa38ce8cf46256425195"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brands_categories" DROP CONSTRAINT "FK_5198460192ebbd084ffbb5aebd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_e50ee303ec1070fd4bc4461d362"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_banners" DROP CONSTRAINT "FK_a1b6389225cc7d56b57bdb207d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_ba7c2d4620cd7088e74e3ba84ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_9ec2c7792817b56a3533ca1d7aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b1b332c0f436897f21a960f26c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tier_model" DROP CONSTRAINT "FK_3386c1c0dba4b5faaf69ea648c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "model" DROP CONSTRAINT "FK_cac03b34b156594338414182c71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_c3992aae3742cdb91294e7ec7fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_062524ac7f03786e461134ea624"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" DROP CONSTRAINT "FK_7558b84d1a659a2a853e09a91bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_a01a568fbbff540189390c77704"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_3f43543ba2a8716cc5d3dd58ae8"`,
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
    await queryRunner.query(
      `DROP INDEX "public"."IDX_596ad21c1604113208b389f94d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a40a1d604fa6427773147fee2"`,
    );
    await queryRunner.query(`DROP TABLE "reviews_files_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cfd8e81fac09d7339a32e57d90"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_36096625e9a713d7b1f8d34eea"`,
    );
    await queryRunner.query(`DROP TABLE "likes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3bfae9d6f312c193f2c715a8da"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5b82a2e77714d67ed2f3fd404f"`,
    );
    await queryRunner.query(`DROP TABLE "product_tierModel"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_697f1706bb9245dee6f7694f12"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3841db663ef502a0a33e6b7cdf"`,
    );
    await queryRunner.query(`DROP TABLE "product_images_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a8ec38e2bc9efdd8c551f6850"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f826b542e381e60f89787ab16a"`,
    );
    await queryRunner.query(`DROP TABLE "tierModel_model"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e50ee303ec1070fd4bc4461d36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1b6389225cc7d56b57bdb207d"`,
    );
    await queryRunner.query(`DROP TABLE "categories_banners"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "tier_model"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_035190f70c9aff0ef331258d28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "model"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "order_products"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(`DROP TABLE "brands_categories"`);
    await queryRunner.query(`DROP TABLE "brand"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "banner"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
