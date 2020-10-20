import { getAll, add, getById, updateById, deleteById, logIn, logOut } from '../controllers/UserController';
import { getCoins, getTopAndBottom } from '../controllers/InstrumentController';
import { Router } from 'express';
import passport from 'passport';

const router = Router(); // Ruta: http://localhost:4000/api/ 

// Instruments controller
router.get('/getTopAndBottom', getTopAndBottom);
router.get('/getCoins', getCoins);

// Users controller
router.get('/getAllUsers', getAll);
router.get('/getUser', getById);
router.get('/user', (req, res) =>{ res.send(req.user); });

router.post('/register', add);
router.post("/login", passport.authenticate("local"), logIn);
router.post("/logout", logOut);

router.put('/updateUser', updateById);
router.delete('/deleteUser', deleteById);

export default router;