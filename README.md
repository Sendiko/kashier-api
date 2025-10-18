## Kashier API

Lightweight REST API for Kashier — a simple Point-of-Sale backend written in TypeScript using Express and Sequelize (MySQL).

This repository contains the API server code, TypeScript sources in `src/`, and a minimal frontend view in `views/index.html`.

## Tech stack
- Node.js + TypeScript
- Express (v5)
- Sequelize (MySQL)
- dotenv for environment configuration

## Features
- JWT-based authentication (see `middleware/auth_middleware.ts`)
- User, Item and History controllers (see `src/controller`)
- Multiple API versions (see `src/route/version_one.ts` and `src/route/version_two.ts`)

## Getting started

Prerequisites
- Node.js (recommended >= 18)
- npm (comes with Node)
- MySQL server (or compatible) if you want to run with a database

Clone the repository

```powershell
git clone https://github.com/Sendiko/kashier-api.git
cd kashier-api
```

Install dependencies

```powershell
npm install
```

Environment
Create a `.env` file in the project root. The project expects a few environment variables; an example minimal set:

```text
# .env example
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=your_password
DB_NAME=kashier_db
JWT_AUTH_KEY=replace_with_secure_key
```

You can generate a secure JWT key with the included npm script:

```powershell
npm run gen:secret
```

This will create or update `JWT_AUTH_KEY` inside `.env`.

Database
The project uses Sequelize with `mysql2`. Configure your database credentials in the `.env` file above. The project currently does not include migration files — it uses Sequelize models directly under `src/models`.

Available scripts
- `npm run dev` — run the TypeScript source directly (uses `tsx src/index.ts`) for development
- `npm run build` — compile TypeScript into `dist/` using `tsc`
- `npm run start` — run the compiled code from `dist/` (use after `npm run build`)
- `npm run gen:secret` — generate/update `JWT_AUTH_KEY` in `.env`

Typical development cycle

```powershell
# start in dev mode
npm run dev

# or build and run
npm run build; npm run start
```

Project structure (high level)

- `src/index.ts` — application entry
- `src/config/config.ts` — configuration loader (dotenv)
- `src/database/db.ts` — Sequelize DB instance
- `src/controller/` — route handlers (user, item, history)
- `src/middleware/auth_middleware.ts` — JWT auth middleware
- `src/models/` — Sequelize models
- `src/route/` — API routing (versioned)
- `views/index.html` — small static view

Contributing
- Fork the repository and create a feature branch: `git checkout -b feat/short-description`
- Make tidy, focused commits. Follow conventional commit messages where possible.
- Update or add tests where applicable (the repo currently doesn't include automated tests — please add when adding features).
- Open a pull request describing the change and linking any related issues.

Code of conduct and PRs
- Keep changes small and focused.
- Include unit tests for new behavior when possible.
- If your change involves DB schema changes, include a migration or clearly document the manual steps.

Developer notes / next steps
- Add automated tests (Jest or Mocha) and a basic GitHub Actions workflow for CI.
- Add Sequelize migrations (recommended) so schema changes are tracked.

License
This project uses the ISC license (see `package.json`).

Contact
If you have questions, open an issue or reach out via the repo's issues page.
