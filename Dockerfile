# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
# --- Use npm ---
# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies (including devDependencies)
RUN npm ci

# --- Use yarn ---
# COPY package.json yarn.lock* ./
# RUN yarn install --frozen-lockfile

# --- Use pnpm ---
# COPY package.json pnpm-lock.yaml* ./
# RUN corepack enable && pnpm install --frozen-lockfile

# Copy the rest of the application code
# Note: This happens *after* npm ci, so node_modules isn't copied from host
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
