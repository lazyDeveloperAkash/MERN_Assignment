# MERN Authentication Project with JWT (Access & Refresh Tokens)

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that implements JWT-based authentication with access and refresh tokens. The tokens are securely stored in HTTP-only cookies.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Available Scripts](#available-scripts-frontend)
10. [License](#license)

## Features

- User login and registration with secure password hashing using `bcrypt.js`
- JWT-based authentication with access and refresh tokens
- Refresh tokens stored in HTTP-only cookies
- Access token auto-refresh mechanism
- Protected routes accessible only with valid access tokens
- Logout functionality that clears tokens
- Secure cookie storage for tokens

## Technologies Used

- **MongoDB**: NoSQL database for storing user information.
- **Express**: Backend framework for handling API requests.
- **React**: Frontend framework for building the user interface.
- **Node.js**: JavaScript runtime for server-side development.
- **JWT (JsonWebToken)**: For authentication (access token and refresh token).
- **Axios**: For making HTTP requests from the frontend.
- **bcrypt.js**: For hashing passwords.
- **dotenv**: For managing environment variables.

## ENDPOINTS

### 🔐POST `/signup`
```json
username: string,
email: string,
password: string
```
### 🔐POST `/signin`
```json
email: string,
password: string
```
### 🔒GET `/`
- get user data if user logged in

### 🔐GET `/access-token`
- get new access token

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/lazyDeveloperAkash/MERN_Assignment
cd MERN_Assignment
```

### 2. Install dependencies fof backend

```bash
cd server
npm install
```

### add `.env` file to root directory

```bash
PORT=5000
MONGO_URI=mongodb+srv://lazyDeveloperAkash:ivkZYDcvwprUbtBz@cluster0.msfry.mongodb.net/
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRE=10m
REFRESH_TOKEN_SECRET=my-refresh-token-secret
REFRESH_TOKEN_EXPIRE=7d
NODE_ENV=development
```

### 3. Install dependencies fof frontend

```bash
cd ../client
npm install
```

# Running the Application

## backend

```js
npx nodemon
// if nodemon not installed in your system you have to install it using
npm i nodemon
```
# frontend

```bash
npm run dev
```
