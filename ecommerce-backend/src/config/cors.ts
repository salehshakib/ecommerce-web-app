import dotenv from 'dotenv';

dotenv.config();

export const corsConfig = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
