var express = require('express');
var app = express();
var path = require("path");
var firebase = require('firebase');
var dotenv = require('dotenv-safe').load();
var bodyParser = require('body-parser');
var hbs = require('hbs')

app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
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

//sample routes to show how routes are created and rendered
//note the http method is specified here (get, post, etc)
//req = request object, res = response object, next = error catcher / callback function
app.get('/', function(req,res,next){
    res.render('home');
});

app.get('/productList', function(req,res,next){
  res.render('productList', {products: products});
});

app.get('/profiles', function(req, res, next){
  res.render('profiles', {pageTitle: "Profiles", profiles: profiles});
});

//demo how request parameters are used
app.get('/params/:text', function(req, res, next){
    res.send(req.params.text);
});

hostport = 8080;
if (process.env.NODE_ENV === 'PRODUCTION'){
    hostport = 80;
}

app.listen(hostport, function(){
    console.log("PinLab is running on port " + hostport.toString());
});
