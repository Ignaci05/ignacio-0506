import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes';

export const createApp = (): Express => {
  const app = express();

  // Middlewares globales
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  //Ruta de la api de SnailPay
  app.use('/api/snailpay', paymentRoutes);

  return app;
};
