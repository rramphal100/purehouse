var express = require('express');
var app = express();
var path = require("path");
var firebase = require('firebase');
var dotenv = require('dotenv-safe').load();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hbs = require('hbs')

app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(cookieParser());
hbs.registerPartials(__dirname + '/views/partials');

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
};

var fire = firebase.initializeApp(config);

var profiles = [];
var firebaseProfileRef = fire.database().ref('/profile/');
firebaseProfileRef.on('value', (snapshot) =>{
  profiles = snapshot.val();
});

var products = [];
firebaseProfileRef = fire.database().ref('/products/');
firebaseProfileRef.on('value', (snapshot) =>{
  products = snapshot.val();
});

// Route for handling login requests
app.route('/user')
    .get(function(req, res){
        //get username from database if username and password from req.body match one in db
        //log user in if match and currently not logged in
        if(!req.cookies.user){
            res.cookie('user', 'ryanramphal');
            res.render('/home', {pageTitle: 'PinLab', user: 'ryanramphal'});
        }
        else{
            res.status(403).send("Error: Already logged in!");
        }
    })
    .delete(function(req,res,next){
        res.clearCookie('user');
        res.send('Logged out successfully.');
    });

app.get('/', function(req,res){
    res.render('landing', {user: req.cookies.user, layout: false});
});

app.get('/home', function(req,res){
    res.render('home');
});

app.get('/productList', function(req,res){
    res.render('productList', {pageTitle: 'Project List', user: req.cookies.user, products: products});
});

app.get('/product', function(req,res){
    let curProduct = products[1];
    console.log("Testing here");
    console.log(curProduct);
    res.render('productDetails', {pageTitle: curProduct.name, user: req.cookies.user, product: curProduct});
});

app.get('/profiles', function(req, res){
    if(req.cookies.user){
        res.render('profiles', {pageTitle: "Profiles", profiles: profiles, user: req.cookies.user});
    }
    else{
        res.render('home', {pageTitle: 'PinLab', user: undefined, loginError: true});
    }
});

hostport = 8080;
if (process.env.NODE_ENV === 'PRODUCTION'){
    hostport = 80;
}

app.listen(hostport, function(){
    console.log("PinLab is running on port " + hostport.toString());
});
