import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeLocationNullable1710000000006 implements MigrationInterface {
    name = 'MakeLocationNullable1710000000006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Делаем колонку location nullable
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "location" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Возвращаем not null constraint
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "location" SET NOT NULL`);
    }
} 