import instrumentsRouter from './routes/instruments.routes'
import express, { json } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app   
.use(cors())
.use(morgan('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended : true}));

app.use("/api", instrumentsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



export default app;