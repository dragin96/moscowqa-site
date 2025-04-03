import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSpamProtection1743598346293 implements MigrationInterface {
    name = 'AddSpamProtection1743598346293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE talk_requests
            ADD COLUMN spam_score integer NOT NULL DEFAULT 0,
            ADD COLUMN is_spam boolean NOT NULL DEFAULT false,
            ADD COLUMN ip_address inet,
            ADD COLUMN email_sent boolean NOT NULL DEFAULT false;
            
            CREATE INDEX idx_talk_requests_ip_address ON talk_requests(ip_address);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_talk_requests_ip_address;
            
            ALTER TABLE talk_requests
            DROP COLUMN email_sent,
            DROP COLUMN ip_address,
            DROP COLUMN is_spam,
            DROP COLUMN spam_score;
        `);
    }

}
