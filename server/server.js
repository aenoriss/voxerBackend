import { Strategy as StrategyJwt, ExtractJwt } from "passport-jwt";
import instrumentsRouter from "./routes/instruments.routes";
import LocalStrategy from "passport-local";
import cookieParser from "cookie-parser";
import db from "./Database/connection";
import bodyParser from "body-parser";
import User from "./Models/User";
import passport from "passport";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

let  path = require('path');

app.use(passport.initialize());

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, next) => {
      User.findOne({
        where: { email }
      })
        .then(user => {
          if (!user) {
            console.log("NOT FOUND");
            return next(null, false, { message: "Usuario no encontrado." });
          }
          if (!user.validPassword(password)) {
            console.log("WRONG");
            return next(null, false, { message: "Contraseña incorrecta." });
          }

          return next(null, user);
        })
        .catch(next);
    }
  )
);

passport.use(
  new StrategyJwt(
    {
      secretOrKey: "mysecretkey",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //pide el token desde el header
    },
    async (token, done) => {
      try {
        return done(null, token.user);  //pasa el token y si lo tiene pasala id el user
      } catch (e) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app
  .use(cors())
  .use(morgan("dev"))
  //.use(express.static('../../public/profilePictures/'))  //en teoria esto deberia dejarte ver la img
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.resolve('./public')));


//en teoria esto recibiria la img

//app.use(flash());

app.use("/api", instrumentsRouter);

// Puertos
const PORT = process.env.PORT || 4000;

// Base de datos
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(console.log);

export default app;
