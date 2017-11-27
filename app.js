var express = require('express');
var app = express();
var path = require("path");
var firebase = require('firebase');
var dotenv = require('dotenv-safe').load();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var hbs = require('hbs')

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
firebaseProductRef = fire.database().ref('/products/');
firebaseProductRef.on('value', (snapshot) =>{
  products = snapshot.val();
});

var roles = [];
var firebaseRoleRef = fire.database().ref('/roles/');
firebaseRoleRef.on('value', (snapshot) => {
    roles = snapshot.val();
});

app.use(express.static(path.join(__dirname,'/public')));
app.use(cookieParser());
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.post('/product', function(req,res){
    let curProduct = products[parseInt(req.body.projectid)];

    //get roles for this product
    let curRoles = [];
    for(let role of roles){
        console.log('id from req body: ', req.body.projectid);
        console.log('id from current role: ', role.productid);
        if(role.productid == req.body.projectid){
            curRoles.push(role);
        }
        else{
            curRoles.push(null);
        }
    }

    console.log(JSON.stringify(curRoles));

    res.render('productDetails', {pageTitle: curProduct.name, user: req.cookies.user, product: curProduct, productId: req.body.projectid,
        roles: curRoles, css: ['sidenav.css', 'productDetails.css', 'review.css']});
});


app.post('/team', function(req,res,next){
    let curProduct = products[parseInt(req.body.projectId)];
    let teammates = [];
    for(let id of curProduct.creators){
        console.log('teammate id: ' + id);
        teammates.push(profiles[id]);
    }

    res.render('creatorDetails', {user: req.cookies.user, pageTitle: req.body.projectName, teammates: teammates,
        teamdescription: curProduct.teamdescription, productname: curProduct.name, teampic: curProduct.teampic,
        css: ['sidenav.css', 'creatorDetails.css']});
});

app.post('/roledetails', function(req,res,next){
    let curRole = roles[parseInt(req.body.roleid)];
    console.log(req.body.productname);
    res.render('roleDetail', {pageTitle: curRole.name, user: req.cookies.user, role: curRole, productname: req.body.productname});
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

app.get('/schoolselect', function(req,res,next){
    res.render('schoolselect', {user: req.cookies.user, layout: false});
});

app.get('/home', function(req,res){
    res.render('home');
});

app.get('/productList', function(req,res){
    res.render('productList', {pageTitle: 'Project List', user: req.cookies.user, products: products,
        css: ['sidenav.css', 'productList.css']});
});

app.get('/profiles', function(req, res){
    if(req.cookies.user){
        res.render('profiles', {pageTitle: "Profiles", profiles: profiles, user: req.cookies.user});
    }
    else{
        res.render('home', {pageTitle: 'PinLab', user: undefined, loginError: true});
    }
});

var hostport = process.env.PORT || 8080;

app.listen(hostport, function(){
    console.log("PinLab is running on port " + hostport.toString());
});
