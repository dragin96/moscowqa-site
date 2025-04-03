import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRegistrationLink1710000000007 implements MigrationInterface {
    name = 'AddRegistrationLink1710000000007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Добавляем колонку registration_link
        await queryRunner.query(`ALTER TABLE "events" ADD COLUMN "registration_link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем колонку registration_link
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "registration_link"`);
    }
} 