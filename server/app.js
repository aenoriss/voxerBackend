import instrumentsRouter from './routes/instruments.routes'
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const bodyParser = require('body-parser');

const app = () => {
  const router = express();
  const apiRoutes = express();

  router.use('/api', apiRoutes); // Ruta principal

  apiRoutes 
  .use(morgan('dev'))
  .use(json())
  .use(cors())
  .use(bodyParser.urlencoded({extended : false}))
  .use(bodyParser.json());

  apiRoutes.use('/instruments', instrumentsRouter); // Ruta autogenerada

  return router;
}

export default app;