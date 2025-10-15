import cors from 'cors';
import express from 'express';

import authRoutes from '@/routes/auth.routes';
import profileRoutes from '@/routes/profile.routes';
import settingsRoutes from '@/routes/settings.routes';
import userRoutes from '@/routes/user.routes';
import swaggerUi from 'swagger-ui-express';

import { authenticate } from '@/middlewares/auth.middleware';
import { errorHandler } from '@/middlewares/error-handler';
import { notFound } from '@/middlewares/not-found';

import type { Application } from 'express';

import { corsConfig } from '@/config/index';
import { openApiDoc } from '@/config/swagger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsConfig));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));
// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', authenticate, profileRoutes);
app.use('/api/v1/user', authenticate, userRoutes);

app.use('/api/v1/settings', settingsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
