# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

ENV PORT=5173

EXPOSE ${PORT}

CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
