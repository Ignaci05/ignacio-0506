import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes';

export const createApp = (): Express => {
  const app = express();

  // Middlewares globales
  app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  app.use(express.json());
  app.use(morgan('dev'));

  // Root & Health check
  app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
      service: 'SnailPay Payment Gateway API',
      status: 'active',
      endpoints: {
        health: '/health',
        charge: 'POST /api/snailpay/charge'
      }
    });
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Ruta de la api de SnailPay
  app.use('/api/snailpay', paymentRoutes);

  return app;
};
