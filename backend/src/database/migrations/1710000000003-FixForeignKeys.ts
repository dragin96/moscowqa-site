import { MigrationInterface, QueryRunner } from "typeorm";

export class FixForeignKeys1710000000003 implements MigrationInterface {
    name = 'FixForeignKeys1710000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Сначала удаляем существующий внешний ключ
        await queryRunner.query(`ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_a2efd1872555dc28b288e5dc1c2"`);
        
        // Добавляем колонку event_id, если её нет
        await queryRunner.query(`ALTER TABLE "talks" ADD COLUMN IF NOT EXISTS "event_id" integer`);
        
        // Создаем новый внешний ключ
        await queryRunner.query(`ALTER TABLE "talks" ADD CONSTRAINT "FK_talks_event" 
            FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем новый внешний ключ
        await queryRunner.query(`ALTER TABLE "talks" DROP CONSTRAINT IF EXISTS "FK_talks_event"`);
        
        // Восстанавливаем старый внешний ключ
        await queryRunner.query(`ALTER TABLE "talks" ADD CONSTRAINT "FK_a2efd1872555dc28b288e5dc1c2" 
            FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
} 