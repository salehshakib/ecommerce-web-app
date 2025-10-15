import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// Vercel Node function handler that reuses the Express app.
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Delegate to Express
  app(req as any, res as any);
}


