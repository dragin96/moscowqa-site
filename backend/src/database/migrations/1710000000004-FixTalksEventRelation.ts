import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTalksEventRelation1710000000004 implements MigrationInterface {
    name = 'FixTalksEventRelation1710000000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Удаляем все существующие внешние ключи между talks и events
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name IN ('FK_talks_event', 'FK_a2efd1872555dc28b288e5dc1c2')
                    AND table_name = 'talks'
                ) THEN
                    ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_event";
                    ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_a2efd1872555dc28b288e5dc1c2";
                END IF;
            END $$;
        `);

        // Проверяем и обновляем колонку event_id
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'talks' AND column_name = 'event_id'
                ) THEN
                    ALTER TABLE "talks" DROP COLUMN "event_id";
                END IF;
            END $$;
        `);

        // Создаем колонку event_id заново
        await queryRunner.query(`ALTER TABLE "talks" ADD COLUMN "event_id" integer`);

        // Создаем новый внешний ключ
        await queryRunner.query(`
            ALTER TABLE "talks" 
            ADD CONSTRAINT "FK_talks_events" 
            FOREIGN KEY ("event_id") 
            REFERENCES "events"("id") 
            ON DELETE SET NULL 
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_events"`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "event_id"`);
    }
} 