//import { getInstruments, getMarketHistory, getWinnersAndLosers, getWinnersAndLosers } from '../controllers/Instruments.controller';
import { getCoins, getPrices, getTopAndBottom } from '../controllers/InstrumentController';
import { Router } from 'express';

const router = Router();

//router.get('/all', getInstruments);
//router.get('/marketHistory', getMarketHistory);
//router.get('/winnersAndLosers', getWinnersAndLosers);

router.get('/getTopAndBottom', getTopAndBottom);
router.get('/getCoins', getCoins);

export default router;

// Ruta: http://localhost:4000/api/instruments/ 
