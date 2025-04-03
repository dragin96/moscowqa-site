import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJsonIds1710000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "speakers" 
            ADD COLUMN "talkIds" jsonb DEFAULT '[]'
        `);

        await queryRunner.query(`
            ALTER TABLE "talks" 
            ADD COLUMN "speakerIds" jsonb DEFAULT '[]'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "speakers" 
            DROP COLUMN "talkIds"
        `);

        await queryRunner.query(`
            ALTER TABLE "talks" 
            DROP COLUMN "speakerIds"
        `);
    }
} 