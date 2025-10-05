# Perfume Backend

A scalable e-commerce backend built with Node.js, Express, TypeScript, and MongoDB.

## Architecture

This project follows a layered architecture pattern:

```
Routes → Controllers → Services → Repositories → Models
```

- **Routes**: API endpoint definitions
- **Controllers**: Request/response handlers
- **Services**: Business logic layer
- **Repositories**: Data access layer
- **Models**: Mongoose schema definitions

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Code Formatting**: Prettier

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middlewares/     # Express middlewares
├── models/          # Mongoose models
├── repositories/    # Data access layer
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── validators/      # Zod validation schemas
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint` - Type check with TypeScript

## API Documentation

API endpoints will be documented here.

## Error Handling

The application includes centralized error handling with custom error classes:
- `ApiError` - Base error class
- `NotFoundError` - 404 errors
- `BadRequestError` - 400 errors
- `UnauthorizedError` - 401 errors
- `ForbiddenError` - 403 errors
- `ConflictError` - 409 errors
- `ValidationError` - 422 errors

## Environment Variables

See `.env.example` for required environment variables.
