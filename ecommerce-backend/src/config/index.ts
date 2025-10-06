import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export { corsConfig } from '@/config/cors.js';
export { jwtConfig } from '@/config/jwt.js';
