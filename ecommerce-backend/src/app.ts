import cors from 'cors';
import express from 'express';

import router from '@/routes/auth.routes';
import swaggerUi from 'swagger-ui-express';

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

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(openApiDoc));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/auth', router);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
