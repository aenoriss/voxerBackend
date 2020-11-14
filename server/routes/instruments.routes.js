import { getCoins, getTopAndBottom } from "../controllers/InstrumentController";
import {
  getAll,
  add,
  getById,
  updateById,
  deleteById,
  logIn,
  logOut,
  me,
  validToken,
} from "../controllers/UserController";
import { Router } from "express";
import passport from "passport";
import multer from 'multer';
import fs from 'fs';

const dir = '././public/profilePictures';

//las 2 de abajo son para la foto en teoria
const storage = multer.diskStorage({
  destination :function(req, file, cb){
    cb(null, '././public/profilePictures');
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
})

const upload = multer({ storage : storage }) //le puedo poner limites de tamaño y tipos

const router = Router(); // Ruta: http://localhost:4000/api/

// Instruments controller
router.get("/getTopAndBottom", getTopAndBottom);
router.get("/getCoins", getCoins);

// Users controller
router.get("/getAllUsers", getAll);
router.get("/getUser", getById);
router.get("/user", (req, res) => {
  res.send(req.user);
});

router.post("/register", add);  //mismas dudas que update
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true
  }),
  logIn
);

router.get("/me", validToken, me);

router.post("/logout", logOut);

router.post("/updateProfilePicture", upload.single('profilePicture'), (req, res) => {   //esto mandaria la dir de la foto
  try {
    console.log(req.file)
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir); // esto es para crear el directorio
  }
    res.send(req.file.path);
  }catch(err) {
    res.send(400);
  }
});

router.put("/updateUser", updateById);   //esta bien el middle aca? se puede poner en update? 
router.delete("/deleteUser", deleteById);

export default router;