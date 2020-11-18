import { Router } from 'express';
const router = Router();

import { getInstruments } from '../controllers/Instruments.controller';

//http://localhost:4000/api/instruments/all
router.get('/all', getInstruments);


export default router;