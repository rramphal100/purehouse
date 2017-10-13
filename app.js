var app = require('express')();
var path = require("path");
var firebase = require('firebase');
app.set("view engine", "hbs");

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

app.use('/member/:id', function(req,res,next){
    //create objects to pass into the view
    

    res.render('member', );
});

console.log(profiles);

app.listen(8080);