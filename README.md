### user-management microservice

# Table of Contents

- [Introduction](#Introduction)
- [Installation](#Installation)
  - [Environment Variables](#EnvironmentVariables)
- [Endpoints](#Endpoints)
  - [UserController](#UserController)
    - [register](#register)
    - [getUsers](#getUsers)
    - [findById](#findById)
    - [resetPassword](#resetPassword)
    - [changePassword](#changePassword)
    - [deleteUser](#deleteUser)
  - [AuthController](#AuthController)
    - [login](#login)
    - [confirmEmail](#confirmEmail)

## Introduction

This is a microservice for user management, built with NestJS. The service provides endpoints for user registration, login, password reset and more. This microservice is a part of the overall banking system and its purpose is to manage user accounts within the system.

## Tech

These are some of tech that the project uses:

- [NestJS](https://nestjs.com/) - A progressive Node.js framework.
- [Typescript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types.
- [Typeorm](https://typeorm.io/) - TypeORM is an ORM that can run in NodeJS.
- [Postgres](https://www.postgresql.org/) - Relational Database.
- [JWT](https://jwt.io/) - JSON Web Tokens.

## Installation:

#### Environment Variables

The following environment variables are required for this microservice:

- `DB_HOST` - The hostname of the database.
- `DB_PORT` - The port of the database.
- `DB_USERNAME` - The username for the database.
- `DB_PASSWORD` - The password for the database.
- `DB_NAME` - The name of the database.
- `APP_PORT` - The port for the microservice.
- `JWT_SECRET` - The secret used to sign JWT tokens.
- `JWT_EXPIRES` - The amount of time a JWT token should be valid for.
- `EMAIL_HOST` - The hostname of the email server.
- `EMAIL_PORT` - The port of the email server.
- `SMTP_SECURE` - Whether to use secure SMTP.
- `EMAIL_USER` - The username for the email account.
- `EMAIL_PASSWORD` - The password for the email account.
- `EMAIL_FROM` - The from address for email notifications.
- `EMAIL_CONFIRMATION_URL` - The URL to confirm a user's email address.
- `THROTTLE_TTL` - The time-to-live for rate limiting in seconds.
- `THROTTLE_LIMIT` - The number of requests allowed per time-to-live.

Install the dependencies, run migrations and start the server.

```sh
npm install
npm run migration:run
npm run start
```

# Endpoints

## UserController

#### register

Create a new user account.

**Path:** `/users/register`

**Method:** `POST`

**Request Body:**
`{
"email": "user@example.com",
"password": "secretpassword",
"firstName": "John",
"lastName": "Doe"
}`

#### getUsers

Retrieve a list of all users. This endpoint is only accessible by administrators.

Path: /users

#### findById

Retrieve the details of a single user, by ID. This endpoint is only accessible by administrators.

**Path:** `/users/:id`

**Method:** `GET`

**Example Request:** `/users/1`

#### resetPassword

Send a password reset email to the specified email address.

**Path:** `/users/reset-password`

**Method:** `POST`

**Request Body:**
`{
"email": "user@example.com"
}`

#### changePassword

Change a user's password.

**Path:** /users/change-password
**Method:** PUT

**Request Body:**
`{
  "userId": "user-id-123",
  "oldPassword": "old-password",
  "newPassword": "new-password"
}`

#### deleteUser

Delete a user account.

**Path:** /users/:id

**Method:** DELETE

</br>

## AuthController

#### login

Authenticate a user and retrieve a JSON Web Token.

**Path:** /auth/login

**Method:** POST

Request Body:
`{
  "email": "user@example.com",
  "password": "secretpassword"
}`

#### confirmEmail

Confirm a user's email address.

**Path:** /auth/confirm-email

Method: POST

Request Body:
`{
    "token": "token generated"
}`

</br>

### Notes

Develop in nodejs version 16.19.0.
Left to do refresh token and unitest.
