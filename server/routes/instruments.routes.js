import { getInstruments, getMarketHistory } from '../controllers/Instruments.controller';
import { Router } from 'express';

const router = Router();

router.get('/all', getInstruments);
router.get('/marketHistory', getMarketHistory);

export default router;

// Ruta: http://localhost:4000/api/instruments/all