const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');
const url = require('../config/config.js').mongoURL;
const authRoutes = require('./routes/auth');
var bodyParser = require('body-parser');

const app = express();

//dev purposes.  prod will be hosted by bluehost and app server on heroku
app.use(serveStatic(path.join(__dirname, '../public')));

//passport local strategy definitions
passport.serializeUser(require('./passport/serialize').serializeUser);
passport.deserializeUser(require('./passport/serialize').deserializeUser);
passport.use(new LocalStrategy(require('./passport/localstrategy').localStrategy));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init passport and sessions
app.use(session({secret: 'boojee', cookie:{ maxAge: 900000 }, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//open mongoDB connection 
mongoose.Promise = global.Promise;
mongoose.connect(url, function(err, db){
    if(err){
        //handle error
    }
    app.locals.db = db;
});

app.use('/auth', authRoutes);

//port 8080
app.listen(process.env.PORT, null, null, ()=> {console.log(process.env.PORT)})

