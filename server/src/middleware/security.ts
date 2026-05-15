import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { Express } from 'express';

export const setupSecurity = (app: Express) => {
  // Security headers
  app.use(helmet());

  // CORS configuration for Vite frontend
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }));

  // Prevent NoSQL injection
  app.use(mongoSanitize());
};
