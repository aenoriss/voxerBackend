import instrumentsRouter from './routes/instruments.routes';
import { Strategy } from 'passport-local';
import cookieParser from 'cookie-parser';
import db from './Database/connection';
import session from 'express-session';
import bodyParser from 'body-parser';
import User from './Models/User';
import passport from 'passport';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import flash from 'connect-flash';

const app = express();

app   
.use(cors())
.use(morgan('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended : true}));

app.use(cookieParser());

// Passport
app.use(session({
    secret: 'Comunitrade',
    cookie: { maxAge: 60000 }
}));


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new Strategy({usernameField:'email' , passwordField:'password'}, ( email , password , next) => {
        console.log(email + " " + password ,"adasdasd")
        
        User.findOne({
            where:{
                email: email
            }
        })
        .then(user => {
            if(!user){
                console.log("NOT FOUND")
                return next(null , false , { message: 'Usuario no encontrado.'});
            }
            if(!user.validPassword(password)){
                console.log("WRONG")
                return next(null , false , { message: 'Contraseña incorrecta.'});
            }
            
            return next(null , user)
        })
        .catch(next)
}));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use("/api", instrumentsRouter);

// Puertos
const PORT = process.env.PORT || 4000;

// Base de datos
db.sync({force: false})
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch(console.log)

export default app;