# MoscowQA Site

Сайт конференции MoscowQA с возможностью подачи заявок на доклады.

## Структура проекта

```
moscowqa-site/
├── backend/           # NestJS бэкенд
│   ├── src/          # Исходный код бэкенда
│   ├── test/         # Тесты
│   └── ...
├── frontend/         # React фронтенд
│   ├── src/         # Исходный код фронтенда
│   └── ...
└── docker-compose.yaml
```

## Требования

- Node.js 20+
- Docker и Docker Compose
- PostgreSQL 15+

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/moscowqa-site.git
cd moscowqa-site
```

2. Установите зависимости:
```bash
npm run install:all
```

3. Создайте файл `.env` в директории backend:
```
# Database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=moscowqa
DB_HOST=localhost
DB_PORT=5432

# Email
ENABLE_EMAIL_NOTIFICATIONS=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Запуск

### Разработка

1. Запустите все сервисы через Docker:
```bash
docker-compose up
```

Или запустите каждый сервис отдельно:

2. Запустите бэкенд:
```bash
npm run start:backend
```

3. Запустите фронтенд:
```bash
npm run start:frontend
```

### Продакшн

1. Соберите проект:
```bash
npm run build
```

2. Запустите через Docker:
```bash
docker-compose -f docker-compose.prod.yaml up
```

## API Endpoints

### Подача заявки на доклад
```
POST /talk-requests

{
  "fullName": "Имя докладчика",
  "email": "email@example.com",
  "company": "Название компании",
  "title": "Тема доклада",
  "description": "Описание доклада"
}
```

## Тестирование

```bash
# Запуск всех тестов
npm run test

# Запуск тестов бэкенда
npm run test:backend

# Запуск тестов фронтенда
npm run test:frontend
```

## Миграции базы данных

```bash
# Создание новой миграции
cd backend && npm run migration:generate

# Применение миграций
cd backend && npm run migration:run

# Откат последней миграции
cd backend && npm run migration:revert
```

## Бэкенд для сайта MoscowQA

## Features
- **Authentication**: JWT-based authentication for secure access.
- **Database**: PostgreSQL integration using TypeORM.
- **Modular Design**: Separate modules for `auth`, `speakers`, `events`, and `talks`.
- **Environment Configuration**: Supports `.env` file for configurable settings.
- **Dockerized**: Easily deployable using Docker and Docker Compose.

## Prerequisites
- Node.js (>= 20.x)
- Docker and Docker Compose

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nestjs-meetup-service.git
   cd nestjs-meetup-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file in the root directory:
```dotenv
WT_SECRET=your_jwt_secret_key

DB_HOST=db
DB_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

ADMIN_USER=
ADMIN_PASSWORD=

```

## Running the Application

### With Docker
1. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at:
    - API: [http://localhost:3000](http://localhost:3000)
    - PostgreSQL: `localhost:5432` (credentials from `.env` file)

### Without Docker
1. Ensure PostgreSQL is running and accessible.
2. Run the development server:
   ```bash
   npm run start:dev
   ```

## API Endpoints

### Authentication
- `POST /auth/login`: Log in and receive a JWT.
    - **Body:** `{ "username": "string", "password": "string" }`

### Speakers
- `GET /speakers`: List all speakers.
- `POST /speakers`: Create a new speaker.

### Events
- `GET /events`: List all events.
- `POST /events`: Create a new event.

### Talks
- `GET /talks`: List all talks.
- `POST /talks`: Create a new talk.

## Project Structure
```plaintext
src/
├── auth/          # Authentication module
├── speakers/      # Speakers module
├── events/        # Events module
├── talks/         # Talks module
├── database/      # Database configuration
└── main.ts        # Application entry point
```

## Development
- Run linting:
  ```bash
  npm run lint
  ```
- Run tests:
  ```bash
  npm run test
  ```

## License
MIT
