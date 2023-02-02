import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1675230995661 implements MigrationInterface {
    name = 'firstMigration1675230995661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('User', 'Admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "address" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'User', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT false, "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
