import { type Request, type Response, type NextFunction } from 'express';
import { ApiError, ValidationError } from '../utils/api-error.js';
import { type ApiResponse } from '../types/api-response.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof ValidationError) {
    const response: ApiResponse = {
      success: false,
      message: err.message,
      errors: err.errors,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err instanceof ApiError) {
    const response: ApiResponse = {
      success: false,
      message: err.message,
      error: err.message,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const response: ApiResponse = {
      success: false,
      message: 'Validation failed',
      error: err.message,
    };
    res.status(400).json(response);
    return;
  }

  // Handle Mongoose duplicate key error
  if (err.name === 'MongoServerError' && 'code' in err && err.code === 11000) {
    const response: ApiResponse = {
      success: false,
      message: 'Duplicate field value entered',
      error: err.message,
    };
    res.status(409).json(response);
    return;
  }

  // Default error
  console.error('Error:', err);
  const response: ApiResponse = {
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  };
  res.status(500).json(response);
};
