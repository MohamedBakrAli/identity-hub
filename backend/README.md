# IdentityHub Backend

NestJS authentication API with JWT and MongoDB.

## Tech Stack

| Technology | Purpose           |
| ---------- | ----------------- |
| NestJS     | Backend framework |
| TypeScript | Type safety       |
| Passport   | Authentication    |
| JWT        | Token-based auth  |
| MongoDB    | Database          |
| Winston    | Logging           |
| Swagger    | API documentation |

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

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## API Endpoints

| Method | Endpoint        | Description   | Auth |
| ------ | --------------- | ------------- | ---- |
| POST   | `/auth/signup`  | Register user | No   |
| POST   | `/auth/signin`  | Login         | No   |
| GET    | `/auth/profile` | Get profile   | Yes  |
| POST   | `/auth/signout` | Logout        | Yes  |
| GET    | `/health`       | Health check  | No   |

## Environment Variables

| Variable         | Default                             | Description      |
| ---------------- | ----------------------------------- | ---------------- |
| `PORT`           | `3000`                              | Server port      |
| `NODE_ENV`       | `development`                       | Environment mode |
| `MONGODB_URI`    | `mongodb://localhost:27017/auth_db` | Database URL     |
| `JWT_SECRET`     | `default_secret`                    | JWT signing key  |
| `JWT_EXPIRES_IN` | `1h`                                | Token expiration |

## Testing

```bash
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

## API Documentation

Swagger UI available at `http://localhost:3000/api` (development only).

> **Note:** Swagger is disabled when `NODE_ENV=production`

## Docker

```bash
# Build image
docker build -t identityhub-backend .

# Run container
docker run -p 3000:3000 -e BACKEND_PORT=3000 identityhub-backend
```

> **Note:** For full-stack deployment, use `docker-compose` from the project root. See the [main README](../README.md).
