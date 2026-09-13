<h1 align="center">Gift Shop</h1>

<p align="center"><em>A full-stack commerce app that runs as three containers with one command.</em></p>

<p align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---
## What it is

A gift catalogue with a typed React client, an Express REST API and a MySQL database. The whole system starts together from a single `compose.yaml`, so there is nothing to install on the host but Docker.

## What it demonstrates

| Area | How |
|---|---|
| Layered API | Controllers, services and a data-access layer, each with one job |
| Security | JWT roles, hashing with a private salt, Helmet headers, rate limiting, XSS stripping, reCAPTCHA |
| Validation | Zod schemas on the model, rejected before anything reaches the database |
| Images | Multipart upload, stored on the server and served back by name |
| State | Redux Toolkit on the client, with an Axios interceptor attaching the token |
| Containers | Three services on a private network, where the service name is the hostname |

## Project structure

```text
Gift Shop/
|-- Backend/         Express API - controllers, services, middleware, models
|   |-- Dockerfile
|   `-- .dockerignore    keeps .env and node_modules out of the image
|-- Frontend/        React SPA - Redux, MUI, react-hook-form
|   `-- Dockerfile
|-- Database/
|   `-- giftshop.sql     schema and seed data
`-- compose.yaml     the three services
```

## Running it

```bash
docker compose up -d --build
```

The client is served on `http://localhost:5173` and the API on `http://localhost:4000`.

The database image runs `Database/giftshop.sql` on its first start only, while the data volume is still empty. To reload the seed data after changing the dump:

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

`.env` is ignored by git. Never commit real keys.

The container-specific values, such as the database host name, are set in `compose.yaml` and take precedence over the file. `dotenv` does not overwrite a variable that already exists in the environment.

---

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  <sub>John Bryce Full Stack Development</sub>
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg">GitHub</a> &middot;
  <a href="https://www.linkedin.com/in/itay-goldenberg/">LinkedIn</a>
</p>
