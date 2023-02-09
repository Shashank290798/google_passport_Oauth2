const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./passport-setup');
const mongoose = require('mongoose');
const User = require('./models/user');
const userRoutes = require('./routes/user');

const server = express();
mongoose.set('strictQuery', true);


// set up session
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// initialize passport and passport session

server.use(passport.initialize());
server.use(passport.session());

// set view engine to EJS
server.set("view engine", "ejs");

// route for home page
server.get('/', (req, res) => {
    res.render('google');
});

// route for success page
server.get('/success', (req, res) => {
    res.render('profile' ,{name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value});
});

// route for failed page
server.get('/failed', (req, res) => {
    res.render('failed');
});

// route for Google authentication

server.get('/google', passport.authenticate('google', {
    scope: [ 'email', 'profile' ]
}));

server.get( '/google/callback',passport.authenticate( 'google', {
    successRedirect: '/google/success',
    failureRedirect: '/failed'
}));
 
// logout functionality
server.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err)
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

server.use('/', userRoutes);

// connect to mongodb

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log("Successfully connected to MongoDB");
    }
});

// listen on port 4000

server.listen(4000, () => {
    console.log("Server started on port 4000");
});