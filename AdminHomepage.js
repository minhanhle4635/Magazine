const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//var url = 'mongodb://localhost:27017';
var url = 'mongodb+srv://minhanhle:minhanh12345@cluster0.nqhz7.gcp.mongodb.net/test';


router.get('/',(req,res)=>{
    if(!req.session.username)
    {
      return res.status(401).send();
    }
      res.render('homepage');
})

router.get('/logout', function (req, res) {
    req.session.username = null;
    res.redirect('/');
});

router.get('/signup',(req,res)=>{
    if(!req.session.username)
    {
      return res.status(401).send();
    } 
    else{
        res.render('signup');
    }
})

router.post('/admin_signup',async(req,res)=>{
    let name = req.body.Name;
    let username = req.body.username;
    let password = req.body.Password;
    let country = req.body.Country;
    let newA = {AdminName : name, Username : username, Password  : password, Country : country};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("Magazine");
    dbo.collection("Student").insertOne(newA);
    res.render('index');
})


module.exports = router;