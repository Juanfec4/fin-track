# Fin Track (Alpha)

A Full stack application that lets users create custom budgets, manage users, and keep track of transactions.

#### Contents

- [Badges](https://github.com/Juanfec4/fin-track/tree/main#badges)
- [Features](https://github.com/Juanfec4/fin-track/tree/main#features)
- [Tech stack](https://github.com/Juanfec4/fin-track/tree/main#tech-stack--dependencies)
- [Roadmap (TO DO)](https://github.com/Juanfec4/fin-track/tree/main#roadmap-to-do)
- [Enviroment variables](https://github.com/Juanfec4/fin-track/tree/main#environment-variables)
- [Run locally](https://github.com/Juanfec4/fin-track/tree/main#run-locally-development-mode)
- [API Documentation](https://github.com/Juanfec4/fin-track#api-documentation)

## Badges

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

# API Documentation

## Budgets

#### 1. Get by ID

- **Endpoint:** `http://192.168.31.20:8080/api/budgets/:id`
- **Method:** GET
- **Description:** Get budget by id.
- **Headers:**
  - Authorization: `KEY`

#### 2. Get all

- **Endpoint:** `http://192.168.31.20:8080/api/budgets`
- **Method:** GET
- **Description:** Get all budgets.
- **Headers:**
  - Authorization: `KEY`

#### 3. Create new

- **Endpoint:** `http://192.168.31.20:8080/api/budgets`
- **Method:** POST
- **Description:** Create new budget.
- **Headers:**
  - Content-Type: `application/json`
  - Authorization: `KEY`
- **Body:**
  ```json
  {
    "budgetName": "string"
  }
  ```

## Auth

#### 1. Refresh

- **Endpoint:** `http://192.168.31.20:8080/auth/refresh`
- **Method:** POST
- **Description:** Refresh token handling.
- **Body:**
  ```json
  {
    "refreshToken": "TOKEN"
  }
  ```

#### 2. Login

- **Endpoint:** `http://192.168.31.20:8080/auth/login`
- **Method:** POST
- **Description:** Login user.
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (Headers):**
  ```json
  {
    "Authorization": "TOKEN",
    "RefreshToken": "TOKEN"
  }
  ```

#### 3. Register

- **Endpoint:** `http://192.168.31.20:8080/auth/register`
- **Method:** POST
- **Description:** Create user account.
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

## Categories

#### 1. Create new

- **Endpoint:** `http://192.168.31.20:8080/api/categories`
- **Method:** POST
- **Description:** Create a new category.
- **Headers:**
  - Authorization: `<TOKEN>`
- **Body:**
  ```json
  {
    "budgetId": "number",
    "type": "string",
    "categoryName": "string",
    "allocatedAmount": "number"
  }
  ```

#### 2. Update

- **Endpoint:** `http://192.168.31.20:8080/api/categories/:id`
- **Method:** PATCH
- **Description:** Update category.
- **Headers:**

  - Authorization: `<TOKEN>`

- **Body:**
  ```json
  {
    "budgetId": "number",
    "categoryName": "string",
    "allocatedAmount": "number"
  }
  ```

#### 3. Get all (for budget)

- **Endpoint:** `http://192.168.31.20:8080/api/categories`
- **METHOD:** GET
- **Description:** Get all categories for a budget.
- **Parameters:**
  - budgetId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`

#### 4. Get by id (for budget)

- **Endpoint:** `http://192.168.31.20:8080/api/categories/:id`
- **Method:** GET
- **Description:** Get a single category by id within a specific budget.
- **Parameters:**
  - budgetId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`

#### 5. Delete by id (for budget)

- **Endpoint:** `http://192.168.31.20:8080/api/categories/:id`
- **Method:** DELETE
- **Description:** Delete a budget category.
- **Parameters:**
  - budgetId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`

## Transactions

#### 1. Create new

- **Endpoint:** `http://192.168.31.20:8080/api/transactions`
- **Method:** POST
- **Description:** Create a new transaction.
- **Headers:**
  - Authorization: `<TOKEN>`
- **Body:**
  ```json
  {
    "budgetId": "number",
    "categoryId": "number",
    "amount": "number",
    "description": "string"
  }
  ```

#### 2. Update

- **Endpoint:** `http://192.168.31.20:8080/api/transactions/:id`
- **Method:** PATCH
- **Description:** Update a transaction.
- **Headers:**
  - Authorization: `<TOKEN>`
- **Body:**
  ```json
  {
    "budgetId": "number",
    "categoryId": "number",
    "amount": "number",
    "description": "string"
  }
  ```

#### 3. Get all

- **Endpoint:** `http://192.168.31.20:8080/api/transactions`
- **Method:** GET
- **Description:** Get all transaction for budget & category.
- **Parameters:**
  - budgetId: `<number>`
  - categoryId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`

#### 4. Get by id

- **Endpoint:** `http://192.168.31.20:8080/api/transactions/:id`
- **Method:** GET
- **Description:** Get transaction by id.
- **Parameters:**
    - budgetId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`

#### 5. Delete

- **Endpoint:** `http://192.168.31.20:8080/api/transactions/:id`\
- **Method:** DELETE
- **Description:** Delete transaction.
- **Parameters:**
    - budgetId: `<number>`
- **Headers:**
  - Authorization: `<TOKEN>`
