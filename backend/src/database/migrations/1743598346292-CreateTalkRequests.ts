import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTalkRequests1743598346292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE talk_requests (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        processed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      );

      CREATE INDEX idx_talk_requests_email ON talk_requests(email);
      CREATE INDEX idx_talk_requests_created_at ON talk_requests(created_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_talk_requests_created_at;
      DROP INDEX idx_talk_requests_email;
      DROP TABLE talk_requests;
    `);
  }
} 