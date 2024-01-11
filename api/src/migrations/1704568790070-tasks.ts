import { MigrationInterface, QueryRunner } from "typeorm";

export class Taskss1704568790070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        --Table Definition
        CREATE TABLE "tasks"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),            
            "user_id" uuid NULL,
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "status" character varying NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP NULL,
            CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"),
            CONSTRAINT "fk_user" FOREIGN KEY(user_id) REFERENCES users(id)
          )
          `),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`, undefined);
  }
}
