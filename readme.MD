# Fin Track (Alpha)

A Full stack application that lets users create custom budgets, manage users, and keep track of transactions.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[![Release Version](https://img.shields.io/badge/Version-1.1.21-blue.svg)](https://choosealicense.com/licenses/mit/)

## Features

#### Pages

- **Home page**: Landing sales, page with CTA and features gallery.
- **FAQ page** : Frequently asked questions & guides about budgeting.
- **Web-app** : Budgeting application, with dashboard (to be built), budgets page (partially complete), and transactions page (to be built).
- **Login/Register pages** : User authentication.

#### Misc

- Responsive design
- Theme toggle (supported: green, blue & red).
- Theme caching on local-storage.

## Tech stack & dependencies

#### Front-end

- React
- Typescript
- React Router
- React Redux
- Sass
- Axios

#### Back-end

- Node.js
- Express
- Knex
- MySQL
- Nodemailer
- Handlebars

## Roadmap (TO-DO)

- Implement transactions on front-end.

- Implement transactions table component on transactions page.

- Add summary chart with chart.js on dashboard.

- Review code, and optimize DB with indexing.

- Migrate Styles to TailwindCSS.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

### Front-end

`VITE_API_BASE` --> Back-end api uri.

### Back-end

#### Database

`DB_HOST` --> hostname.

`DB_NAME` --> Name of locally created schema on MySql workbench.

`DB_USER` --> DB access username on MySql workbench.

`DB_PASSWORD` --> DB access password.

#### Auth

`TOKEN_SECRET` --> Token secret

`REFRESH_TOKEN_SECRET` --> Token secret.

#### CORS

`ORIGIN` --> Front-end origin or \* for simplicity.

#### Mailing service

`SMTP_USER` --> Smtp user (please contact me, I can provide an exisiting one).

`SMTP_PASSWORD` --> Smtp password.

`SMTP_SERVICE` --> Provider (I recommend gmail).

`FOOTER_MESSAGE` --> Message displayed in the bottom of emails.

## Run Locally (Development mode)

Clone the project

```bash
  git clone https://github.com/Juanfec4/fin-track
```

Go to the project directory

```bash
  cd fin-track
```

#### Back-end setup

Go to the back-end directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create `.env` file & add variables

```bash
  touch .env
```

Set-up DB

```bash
  npm run migrate
```

Start the server

```bash
  npm run start
```

#### Front-end setup

Go to the front-end directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Create `.env` file & add variables

```bash
  touch .env
```

Start application

```bash
  npm run dev
```
