import express from 'express';
import morgan from 'morgan';
import { setupSecurity } from './middleware/security';
import { auth } from './lib/auth';
import { toNodeHandler } from "better-auth/node";

const app = express();

// Middleware
setupSecurity(app);
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routes
import resourceRoutes from './routes/resources';

// API routes
app.all('/api/auth/*', toNodeHandler(auth));
app.use('/api/resources', resourceRoutes);

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Shario API is running' });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});

export default app;
