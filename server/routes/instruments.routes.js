import { getCoins, getTopAndBottom } from '../controllers/InstrumentController';
import { getAll, add, getById, updateById, deleteById } from '../controllers/UserController';
import { Router } from 'express';

const router = Router();

// Instruments controller
router.get('/getTopAndBottom', getTopAndBottom);
router.get('/getCoins', getCoins);

// Users controller
router.get('/updateUser', updateById);
router.get('/deleteUser', deleteById);
router.get('/getAllUsers', getAll);
router.get('/getUser', getById);
router.get('/addUser', add);

export default router;

// Ruta: http://localhost:4000/api/instruments/ 
