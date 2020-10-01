import instrumentsRouter from './routes/instruments.routes'
import express, { json } from 'express';
import morgan from 'morgan'

const app = () => {
  const router = express();
  const apiRoutes = express();

  router.use('/api', apiRoutes); // Ruta principal

  apiRoutes 
  .use(morgan('dev'))
  .use(json());

  apiRoutes.use('/instruments', instrumentsRouter); // Ruta autogenerada

  return router;
}

export default app;