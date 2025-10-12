export const corsConfig = {
  origin: [process.env.CORS_ORIGIN || 'http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
};
