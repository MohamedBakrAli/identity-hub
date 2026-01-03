# IdentityHub Frontend

React 19 authentication UI built with Vite and TypeScript.

## Tech Stack

| Technology       | Purpose             |
| ---------------- | ------------------- |
| React 19         | UI library          |
| TypeScript       | Type safety         |
| Vite 7           | Build tool          |
| React Router DOM | Client-side routing |
| React Hook Form  | Form handling       |
| Zod              | Schema validation   |

## Project Structure

```
src/
├── api/              # Backend API calls
│   └── auth.api.ts
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── SigninForm.tsx
│   └── SignupForm.tsx
├── config/           # Configuration
│   └── api.ts
├── context/          # React context
│   ├── authContext.ts
│   └── AuthProvider.tsx
├── hooks/            # Custom hooks
│   └── useAuth.ts
├── pages/            # Route pages
│   ├── Home.tsx
│   ├── SigninPage.tsx
│   ├── SignupPage.tsx
│   └── NotFoundPage.tsx
├── services/         # Business logic
│   └── authService.ts
├── types/            # TypeScript types
│   └── auth.ts
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Pages

| Route     | Component    | Description       |
| --------- | ------------ | ----------------- |
| `/`       | Home         | Landing page      |
| `/signup` | SignupPage   | User registration |
| `/signin` | SigninPage   | User login        |
| `*`       | NotFoundPage | 404 error         |

## Authentication Features

- **Sign Up** - Email, name, password with validation
  - Email format validation
  - Name: minimum 3 characters
  - Password: 8+ chars, letter, number, special character
- **Sign In** - Email and password login
- **Sign Out** - Clear session and logout

## Environment Variables

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `5173`  | Server port |

## Docker

```bash
# Build image
docker build -t identityhub-frontend .

# Run container
docker run -p 5173:5173 -e FRONTEND_PORT=5173 identityhub-frontend
```

> **Note:** For full-stack deployment, use `docker-compose` from the project root. See the [main README](../README.md).
