const User = require('../Models/User');
import passport from "passport";
import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
  try {
    let users = await User.findAll({ attributes: ['userId', 'firstName', 'lastName', 'nickName', 'email', 'level', 'mentor', 'description', 'profilePicture', 'birthDate', 'followers', 'following']});
    res.send(users);

  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: ('Error en el getAll (User): ' + error)
    });
  }
}

export const add = async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).send();

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: ('Error en el add (User): ' + error)
    });
  }
}

export const getById = async (req, res) => {
  try {
    let user = await User.findByPk(req.query.userId);

    res.send(user);

  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: ('Error en el getById (User): ' + error)
    });
  }
}

export const updateById = async (req, res) => {
  try {
    await User.update(req.body, {          //depende lo que le pasen desde el front modifica un valor o todos
      where: {
        userId: req.body.userId
      }
    });

    res.status(201).send();

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: ('Error en el updateById (User): ' + error)
    });
  }
}

export const deleteById = async (req, res) => {
  try {
    let user = await User.findByPk(req.query.userId);

    await User.destroy({
      where: {
        userId: user.userId
      }
    });

    res.status(201).send();

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: ('Error en el deleteById (User): ' + error)
    });
  }
}

export const logIn = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("new Error");
        return next(error);
      }
      req.login(user, { session: false }, err => {
        if (err) return next(err);
        const token = jwt.sign({ id: user.userId }, "mysecretkey", {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
};

export const validToken = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["x-access-token"];     //Esto es lo que tienen que pasar para usar cosas onda el /me, es el token de "sesion"
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided" });
  }
  try {
    const decoded = await jwt.verify(token, "mysecretkey");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.send(401);
  }
};

export const me = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (!user) {
    return res.status(404).send("No user found.");
  }
  res.status(200).json(user);           //retorna todos los datos del user
};

export const logOut = async (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
    res.send(200);
  } else {
    res.send(400);
  }
}