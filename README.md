<p align="center">
  <img src="./docs/readme-banner.svg" alt="Gift Shop animated project banner" width="100%" />
</p>

<p align="center">
  <a href="#running-it"><img src="./docs/actions/run.svg" alt="Run Gift Shop locally" width="250" /></a>
  <a href="https://github.com/itaygoldenberg/gift-shop"><img src="./docs/actions/source.svg" alt="View the Gift Shop source" width="250" /></a>
  <a href="https://github.com/itaygoldenberg?tab=repositories"><img src="./docs/actions/github.svg" alt="More projects by Itay Goldenberg" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Connect with Itay Goldenberg on LinkedIn" width="250" /></a>
</p>

> [!NOTE]
> A full-stack course project: a typed React client, an Express REST API and a MySQL database, packaged so the whole system starts with one command.

<p align="center">
  <a href="#overview">Overview</a>&nbsp;&middot;&nbsp;
  <a href="#features">Features</a>&nbsp;&middot;&nbsp;
  <a href="#technology">Technology</a>&nbsp;&middot;&nbsp;
  <a href="#project-structure">Project structure</a>&nbsp;&middot;&nbsp;
  <a href="#running-it">Running it</a>&nbsp;&middot;&nbsp;
  <a href="#notes">Notes</a>
</p>

## Overview

Gift Shop is a commerce catalogue built as three cooperating parts. The client is a typed React SPA with Redux state and MUI components. The API is a layered Express service with its own controllers, services and data-access layer. The database is MySQL, seeded from a dump in the repository.

What ties them together is `compose.yaml`: the three run as containers on a private network, where each service reaches the others by name rather than by address. Nothing has to be installed on the host but Docker.

| Project detail | Implementation |
|---|---|
| Frontend | React, TypeScript, Redux Toolkit and MUI |
| Backend | Express REST API written in TypeScript |
| Data | MySQL, seeded from `Database/giftshop.sql` |
| Security | JWT roles, hashing with a private salt, Helmet, rate limiting, XSS stripping, reCAPTCHA |
| Validation | Zod schemas on the model layer |
| Images | Multipart upload, stored server-side and served back by name |
| Containers | Three-service Docker Compose stack |

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Running it](#running-it)
- [Notes](#notes)

## Features

### Catalogue workflows

Products can be listed, created, edited and deleted, each with an image. The forms are validated before anything is sent, and again on the server before anything reaches the database.

### Authentication and authorization

Passwords are hashed with an HMAC and a private salt. A JWT carries the role, and the client attaches it through an Axios interceptor rather than at every call site. Write operations require a signed-in user; deletion requires an administrator.

### Layered API

A request passes through a controller, a service and a data-access layer, and each one has a single job. Prepared statements keep SQL out of the request.

### Validation in one place

Zod describes what a valid product looks like. The same schema rejects a bad request and documents the shape, so the rules live in one file instead of being repeated in every route.

### One command to run

The client, the API and the database are declared in `compose.yaml` and start together. The service name is the hostname on the private network, which is why the API reaches the database at `mysql-service` and not at `localhost`.

## Technology

<p align="center">
  <img src="./docs/tech-strip.svg" alt="Gift Shop technologies" width="100%" />
</p>

| Technology | Role |
|---|---|
| React + TypeScript | Typed single page application |
| Redux Toolkit | Global state for products and the signed-in user |
| MUI + Emotion | Component library and theming |
| Axios | HTTP client, with an interceptor that attaches the token |
| Node.js + Express | REST API runtime |
| MySQL + mysql2 | Relational persistence with prepared statements |
| JWT | Authentication and role-aware routes |
| Zod | Model validation |
| Helmet, rate limit, striptags | Response headers, request throttling and XSS stripping |
| Docker Compose | Three-service local stack |

## Project structure

```text
Gift Shop/
|-- Backend/                  Express and TypeScript API
|   |-- src/controllers/      HTTP routes
|   |-- src/services/         business logic and data access
|   |-- src/middleware/       security and error handling
|   |-- src/models/           typed contracts and Zod schemas
|   |-- Dockerfile            API image
|   `-- .dockerignore         keeps .env and node_modules out of the image
|-- Frontend/                 React and TypeScript SPA
|   `-- Dockerfile            client image
|-- Database/
|   `-- giftshop.sql          schema and seed data
|-- docs/                     README artwork only
`-- compose.yaml              the three services
```

## Running it

```bash
docker compose up -d --build
```

The client is served on `http://localhost:5173` and the API on `http://localhost:4000`.

The database image runs every script in its initialisation folder, but only on the first start, while the data volume is still empty. To reload the seed data after changing the dump:

```bash
docker compose down -v
```

## Environment

Copy `.env.example` to `.env` and fill in your own values:

```env
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=giftshop
JWT_SECRET=replace_with_a_long_random_secret
HASH_SALT=replace_with_a_private_salt
```

`.env` is ignored by git. A key that reaches GitHub is public from the moment it is pushed.

## Notes

- `Backend/.env` is not copied into the image. Compose mounts it read-only at run time, and the container-specific values in `compose.yaml` take precedence, because `dotenv` does not overwrite a variable that already exists in the environment.
- Changing `HASH_SALT` invalidates every password already stored. Set it once and leave it.
- Review CORS, uploads, rate limits and database privileges before exposing this beyond a local machine.

## Author

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  <sub>Full Stack Developer Student &middot; John Bryce</sub>
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg"><img src="./docs/actions/github.svg" alt="Itay Goldenberg on GitHub" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Itay Goldenberg on LinkedIn" width="250" /></a>
</p>
