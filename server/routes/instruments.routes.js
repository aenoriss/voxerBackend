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
import {createPost, getPosts, createComment,getComments} from "../controllers/postController"
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

router.post("/createPost", createPost)
router.post("/createComment", createComment)
router.get("/getPosts", getPosts)
router.get("/getComments", getComments)




router.post("/updateProfilePicture", upload.single('profilePicture'), (req, res) => {   //esto mandaria la dir de la foto
  try {

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir); // esto es para crear el directorio
  }

  let imgUrl = req.file.path
  console.log("imgUrl1",imgUrl)

  imgUrl = imgUrl.replace("public/","");
  console.log("imgUrl2",imgUrl)


  let saveImage = {}
  saveImage.body = {userId:req.body.userId, profilePicture:imgUrl}

  updateById(saveImage, res).then(response => {
      console.log("UPDATED?", response);
  });

res.send(imgUrl);
  }catch(err) {
    res.send(400);
  }
});

export default router;