FROM node:20-alpine AS builder
WORKDIR /app

# Cache bust FIRST - before everything
ARG BUILD_BUST=1
ENV BUILD_BUST=$BUILD_BUST

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-p", "8080"]
