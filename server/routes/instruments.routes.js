import { getInstruments, getMarketHistory, getWinnersAndLosers } from '../controllers/Instruments.controller';
import { Router } from 'express';

const router = Router();

router.get('/all', getInstruments);
router.get('/marketHistory', getMarketHistory);
router.get('/winnersAndLosers', getWinnersAndLosers);

export default router;

// Ruta: http://localhost:4000/api/instruments/all