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
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new Strategy({usernameField:'email' , passwordField:'password'}, ( email , password , done ) => {
        User.findOne({
            where:{
                email: email
            }
        })
        .then(user => {
            if(!user){
                return done(null , false , { message: 'Usuario no encontrado.'})
            }
            if(!user.validPassword(password)){
                return done(null , false , { message: 'Contraseña incorrecta.'});
            }
            return done(null , user)
        })
        .catch(done)
}));

passport.serializeUser((user, done)=>{
    done(null,user.userId)
});

passport.deserializeUser((id, done)=>{
    User.findByPk(id)
    .then(user => done(null, user))
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