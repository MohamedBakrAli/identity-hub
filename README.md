# IdentityHub

A full-stack authentication system with a NestJS backend and React frontend.

## Overview

IdentityHub provides a complete authentication solution including user registration, login, session management, and profile access.

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React 19, TypeScript, Vite, Zod   |
| Backend  | NestJS, TypeScript, Passport, JWT |
| Database | MongoDB                           |
| Proxy    | Nginx                             |
| Runtime  | Docker, Docker Compose            |

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 22+ (for local development)

### Running with Docker

```bash
# Clone the repository
git clone <repository-url>
cd IdentityHub

# Create environment file
cp .env.example .env

# Start all services
docker-compose up --build
```

The application will be available at `http://localhost`

### Services

| Service  | Description       | Port                 |
| -------- | ----------------- | -------------------- |
| nginx    | Reverse proxy     | 80 (exposed)         |
| frontend | React application | 5173 (FRONTEND_PORT) |
| backend  | NestJS API        | 3000 (BACKEND_PORT)  |
| mongo    | MongoDB database  | 27017                |

## Project Structure

```
IdentityHub/
├── backend/              # NestJS API server
│   └── README.md         # Backend documentation
├── frontend/             # React application
│   └── README.md         # Frontend documentation
├── nginx/                # Nginx reverse proxy config
├── docker-compose.yml
├── .env                  # Environment variables
└── README.md
```

## Documentation

For detailed documentation, see the individual READMEs:

- **[Backend Documentation](./backend/README.md)** - API endpoints, environment variables, testing
- **[Frontend Documentation](./frontend/README.md)** - Project structure, components, development

## Environment Variables

Create a `.env` file in the project root:

```env
# Ports
FRONTEND_PORT=5173
BACKEND_PORT=3000

# Application
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h
```

## API Endpoints

| Method | Endpoint            | Description      | Auth     |
| ------ | ------------------- | ---------------- | -------- |
| GET    | `/api/health`       | Health check     | No       |
| POST   | `/api/auth/signup`  | Register user    | No       |
| POST   | `/api/auth/signin`  | Login            | No       |
| GET    | `/api/auth/profile` | Get user profile | Required |
| POST   | `/api/auth/signout` | Logout           | Required |

## License

MIT
