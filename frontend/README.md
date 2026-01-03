# IdentityHub Frontend

A modern React frontend for the IdentityHub authentication system built with Vite, TypeScript, and React 19.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **ESLint** - Code linting

## Project Structure

```
src/
├── api/              # API functions for backend communication
│   └── auth.api.ts
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── SigninForm.tsx
│   └── SignupForm.tsx
├── config/           # Configuration constants
│   └── api.ts
├── context/          # React context providers
│   ├── authContext.ts
│   └── AuthProvider.tsx
├── hooks/            # Custom React hooks
│   └── useAuth.ts
├── pages/            # Page components
│   ├── Home.tsx
│   ├── SigninPage.tsx
│   ├── SignupPage.tsx
│   └── NotFoundPage.tsx
├── services/         # Service layer
│   └── authService.ts
├── types/            # TypeScript type definitions
│   └── auth.ts
├── App.tsx           # Root component with routing
└── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Features

### Authentication

- **Sign Up** - Register with email, name, and password

  - Email format validation
  - Name minimum 3 characters
  - Password requirements: 8+ chars, letter, number, special character

- **Sign In** - Login with email and password

- **Sign Out** - Logout and clear session

### Pages

| Route     | Page         | Description                   |
| --------- | ------------ | ----------------------------- |
| `/`       | HomePage     | Landing page with auth status |
| `/signup` | SignupPage   | User registration             |
| `/signin` | SigninPage   | User login                    |
| `*`       | NotFoundPage | 404 error page                |

## Deployment

Deployment is done via Docker using `docker-compose` from the project root.

### Full Stack Deployment

From the project root directory:

```bash
# Build and start all services (frontend, backend, mongodb, nginx)
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop all services
docker-compose down
```

The application will be available at `http://localhost`

### Services

| Service  | Description              | Internal Port |
| -------- | ------------------------ | ------------- |
| nginx    | Reverse proxy            | 80 (exposed)  |
| frontend | React app (Vite preview) | 4173          |
| backend  | NestJS API               | 3000          |
| mongo    | MongoDB database         | 27017         |

### Standalone Docker Build

```bash
# Build frontend image
docker build -t identityhub-frontend .

# Run frontend container
docker run -p 4173:4173 identityhub-frontend
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=/api
```
