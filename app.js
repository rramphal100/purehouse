var express = require('express');
var app = express();
var path = require("path");
var firebase = require('firebase');
var bodyparser = require('body-parser');

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

var config = {
    apiKey: "AIzaSyAYNtFQO6DHnLNumEDuNCjqGYBXXjlfY7s",
    authDomain: "idearank-47142.firebaseapp.com",
    databaseURL: "https://idearank-47142.firebaseio.com",
    projectId: "idearank-47142",
    storageBucket: "idearank-47142.appspot.com",
    messagingSenderId: "441163562896"
};

var fire = firebase.initializeApp(config);

var profiles = [];
var firebaseRef = fire.database().ref('/profile/');
firebaseRef.on('value', (snapshot) =>{
  profiles = snapshot.val();
  console.log(profiles);

});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

app.use('/member/:id', function(req,res,next){
    //create objects to pass into the view
    var profile = {};
    var user = {};
    firebaseRef.on('value', (snapshot) => {
        profile = snapshot[req.params.id];
        user = snapshot[0];
    });

    res.render('member', {profile: profile, user: user});
});

console.log(profiles);

app.listen(8080, function(){
    console.log("App listening on port 8080.");
});