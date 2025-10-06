import express, { type Application } from 'express';
import cors from 'cors';
import { corsConfig } from '@/config/index.js';
import { errorHandler } from '@/middlewares/error-handler.js';
import { notFound } from '@/middlewares/not-found.js';
import authRoutes from '@/routes/auth.routes.js';

const app: Application = express();

// Middleware
app.use(cors({ origin: corsConfig.origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
