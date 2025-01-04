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
