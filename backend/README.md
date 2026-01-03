# IdentityHub Backend

NestJS authentication API with JWT and MongoDB.

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## API Endpoints

| Method | Endpoint        | Description   | Auth |
| ------ | --------------- | ------------- | ---- |
| POST   | `/auth/signup`  | Register user | No   |
| POST   | `/auth/signin`  | Login         | No   |
| GET    | `/auth/profile` | Get profile   | Yes  |
| POST   | `/auth/signout` | Logout        | Yes  |

## Project Structure

```
src/
├── common/
│   ├── decorators/     # @CurrentUser
│   ├── filters/        # AllExceptionsFilter
│   ├── guards/         # JwtAuthGuard
│   └── interceptors/   # ResponseInterceptor
├── config/             # App, database, JWT config
├── modules/
│   ├── auth/           # Authentication
│   └── users/          # User management
└── shared/
    └── logger/         # Winston logger
```

## Environment Variables

| Variable         | Default                             |
| ---------------- | ----------------------------------- |
| `PORT`           | `3000`                              |
| `NODE_ENV`       | `development`                       |
| `MONGODB_URI`    | `mongodb://localhost:27017/auth_db` |
| `JWT_SECRET`     | `default_secret`                    |
| `JWT_EXPIRES_IN` | `1h`                                |

## Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage
```

## API Documentation

OpenAPI/Swagger documentation available at (development only):

```
http://localhost:3000/api
```

> **Note:** Swagger is disabled in production (`NODE_ENV=production`)

## Docker

```bash
docker build -t identityhub-backend .
docker run -p 3000:3000 identityhub-backend
```
