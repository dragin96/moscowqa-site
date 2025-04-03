import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTalkEventRelation1710000000005 implements MigrationInterface {
    name = 'UpdateTalkEventRelation1710000000005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Удаляем все существующие внешние ключи
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1 FROM information_schema.table_constraints 
                    WHERE constraint_name IN ('FK_talks_event', 'FK_talks_events', 'FK_a2efd1872555dc28b288e5dc1c2')
                    AND table_name = 'talks'
                ) THEN
                    ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_event";
                    ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_events";
                    ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_a2efd1872555dc28b288e5dc1c2";
                END IF;
            END $$;
        `);

        // Удаляем старую колонку event_id, если она существует
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

        // Создаем новую колонку event_id
        await queryRunner.query(`ALTER TABLE "talks" ADD COLUMN "event_id" integer`);
        
        // Создаем внешний ключ
        await queryRunner.query(`
            ALTER TABLE "talks" 
            ADD CONSTRAINT "FK_talks_events_relation" 
            FOREIGN KEY ("event_id") 
            REFERENCES "events"("id") 
            ON DELETE SET NULL 
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_events_relation"`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "event_id"`);
    }
} 