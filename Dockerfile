# Dockerfile for Tagline Frontend (Next.js 15.x)
# Multi-stage for smaller images and production best practices

# 1. Install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --progress=false
COPY . .
RUN npm run build

# 2. Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit --progress=false

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "start"]
