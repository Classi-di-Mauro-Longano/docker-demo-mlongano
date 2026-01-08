# AI Coding Instructions for Task API

## Project Context
- **Architecture**: Node.js REST API using Express (v4.x) and local SQLite database.
- **Infrastructure**: Dockerized heavily. Multi-stage builds (`deps`, `prod-deps`, `runner`) and Docker Compose orchestration.
- **Entry Point**: `src/app.js` is the main entry point. Codebase is modular (routes, middleware, config).

## Architecture & Data Flow
- **Structure**:
  - `src/` - App source code
  - `src/routes/` - Route definitions
  - `src/middleware/` - Custom middleware (error handling, validation)
  - `src/config/` - Configuration (database connection)
  - `src/data/` or `/app/data` (runtime) - SQLite database location
- **Database**: Uses `better-sqlite3` for synchronous, performant SQLite operations. initialized via `initializeDatabase()`.
- **Environment**: Critical config (PORT, NODE_ENV, DB_PATH) managed via `process.env` with sensible defaults.

## Developer Workflows
- **Running Locally**: `npm run dev` (Node --watch).
- **Docker**:
  - Build & Run: `docker compose up -d`
  - Rebuild: `docker compose build` (important when dependency changes)
  - **Note**: The Dockerfile expects source code in `src/`. Ensure files are organized there.
- **Linting**: `npm run lint` / `npm run lint:fix` (ESLint).

## Coding Conventions & Patterns
- **Module System**: CommonJS (`require`).
- **Error Handling**:
  - ALWAYS use `next(err)` in async route handlers to pass errors to the global error handler.
  - Use `middleware/errorHandler.js` for centralized error response formatting.
- **Security**:
  - Use `helmet()` for security headers.
  - Use `express-validator` for request validation.
  - Implement decent `cors` configuration.
- **Logging**: Use `morgan` for HTTP request logging. Use `console.log/error` structured neatly for app lifecycle events (see `app-finale.js` startup banner).
- **Health Checks**: Maintain `GET /health` endpoint returning `{ status: 'healthy', ... }` for Docker healthchecks.

## Docker Specifics
- **User**: App runs as non-root user `nodejs` (UID 1001).
- **Persistence**: SQLite DB file located at `DB_PATH` must be in a volume (mapped to `/app/data` in Compose).
- **Signals**: App is wrapped in `dumb-init`. Ensure code handles `SIGTERM`/`SIGINT` for graceful shutdown if adding complex background tasks.
