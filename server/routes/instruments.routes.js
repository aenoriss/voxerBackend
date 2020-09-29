import { Router } from 'express';
const router = Router();

import { getInstruments,
         getInstrumentsProbando
         } from '../controllers/Instruments.controller';

//http://localhost:4000/api/instruments/all
router.get('/all', getInstrumentsProbando);
router.get('/probando', getInstrumentsProbando);


export default router;