import express, { json } from 'express';
import morgan from 'morgan'



import instrumentsRouter from './routes/instruments.routes'



const app = () => {
  const router = express();
  const apiRoutes = express();

  apiRoutes
    .use(morgan('dev'))
    .use(json());

  
  apiRoutes.use('/instruments', instrumentsRouter);


  
  router.use('/api', apiRoutes);
  return router;
}

export default app;