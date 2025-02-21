# User Management API

A RESTful API built with Express.js and TypeScript for user management with authentication and authorization.

## Features

- User authentication (signup/login)
- JWT-based authorization
- Role-based access control (admin/user)
- CRUD operations for users
- Input validation using Joi
- MongoDB integration with Mongoose
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone (https://github.com/akshat-code21/Wellfound-Assignement-Backend)
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```env
JWT_SECRET=your_jwt_secret_key
MONGO_URL=your_mongodb_connection_string
```

## Running the Application

Development mode:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Endpoints

### Authentication

- **POST /api/auth/signup**
  - Register a new user
  - Body: `{ name, email, password, role? }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ email, password }`

### Users

All user endpoints require authentication (JWT token in Authorization header)

- **POST /api/users**
  - Create a new user
  - Body: `{ name, email, role }`

- **GET /api/users**
  - Get all users

- **GET /api/users/:id**
  - Get user by ID
  - Params: `id`

- **PUT /api/users/:id**
  - Update user
  - Params: `id`
  - Body: `{ name?, email?, role? }`

- **DELETE /api/users/:id**
  - Delete user (Admin only)
  - Params: `id`

## Authentication

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Validation

Request validation is implemented using Joi for:
- User registration
- Login
- User creation/updates
- ID parameters

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Project Structure
```
src/
├── @types/ # TypeScript type definitions
├── config/ # Configuration files
├── middlewares/ # Express middlewares
├── models/ # Mongoose models
├── routes/ # API routes
├── validators/ # Joi validation schemas
└── index.ts # Application entry point
```

## Technologies Used

- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT for authentication
- Joi for validation
- bcrypt for password hashing
