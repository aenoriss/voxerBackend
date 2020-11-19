const VoxPosts = require('../Models/Post');
const VoxComments = require('../Models/Comments');

export const createPost = async (req, res) => {
    try {
    console.log("reqqqqq", req.body);
      await VoxPosts.create(req.body)
      res.status(201).send();
  
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: ('Error en la creación de POST' + error)
      });
    }
  }

  export const getPosts = async (req, res) => {
    try {
      let posts = await VoxPosts.findAll();
      res.send(posts);
  
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: ('Error en el getAll (User): ' + error)
      });
    }
  }

  export const createComment = async (req, res) => {
    try {
      await VoxComments.create(req.body)
      res.status(201).send();
  
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: ('Error en la creación de Comentario' + error)
      });
    }
  }

  export const getComments = async (req, res) => {
    try {
      console.log("POST REQUEST BODY", req.query);
      let user = await VoxComments.findAll({
        where: { VoxPostPostId: req.query.postId},
      });
  
      res.send(user);
  
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: ('Error en el getById (User): ' + error)
      });
    }
  }
