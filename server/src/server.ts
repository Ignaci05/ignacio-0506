import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = createApp();

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] SnailPay Mock API corriendo en http://localhost:${PORT}`);
  });
}

export default app;
