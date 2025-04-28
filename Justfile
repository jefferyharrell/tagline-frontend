# Justfile for Tagline Frontend (Next.js)
# Usage: just <recipe>

# Default: show help
default:
    just help

# Set up dev environment
setup:
    #!/usr/bin/env bash
    if [ ! -f "node_modules/.bin/next" ]; then npm ci; fi
    if [ ! -f ".env" ] && [ -f ".env.example" ]; then cp .env.example .env; fi
    echo -e "\033[1;32mSetup complete! Run 'npm run dev' to start coding.\033[0m"

format:
    npx prettier --write .

lint:
    npx eslint . --fix

# Testing
unit-tests:
    npx jest

e2e-tests:
    # Run Playwright E2E tests (mocked backend)
    npx playwright test

test:
    just unit-tests
    just e2e-tests

all:
    just format
    just lint
    just test

clean:
    rm -rf .next node_modules coverage
    echo "Cleaned up build and test artifacts."

# Docker Compose
up:
    docker compose up -d

down:
    docker compose down

build:
    docker compose build

logs:
    docker compose logs -f

shell:
    docker exec -it frontend /bin/sh

# Clean up Docker artifacts
prune:
    docker system prune -f

# Show help
help:
    @echo "\nJustfile: Tagline Frontend Project Helper\n"
    @just --list
    @echo "\nRun 'just <command>' to execute a task."
    @echo "For details: see README.md."
