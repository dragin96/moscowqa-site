import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEventStructure1710000000002 implements MigrationInterface {
    name = 'UpdateEventStructure1710000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Удаляем старые колонки
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN IF EXISTS "is_publish"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN IF EXISTS "company"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN IF EXISTS "registration_link"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN IF EXISTS "stream_link"`);
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN IF EXISTS "videos_link"`);

        // Обновляем тип колонки description
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "description" TYPE text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Восстанавливаем старые колонки
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "is_publish" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "company" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "registration_link" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "stream_link" character varying`);
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "videos_link" character varying`);

        // Возвращаем старый тип для description
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "description" TYPE character varying`);
    }
} 