const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb+srv://minhanhle:minhanh12345@cluster0.nqhz7.gcp.mongodb.net/test';

router.get('/',(req,res)=>{
    req.session.username = null;
    res.render('index');
})

router.post('/signup',async(req,res)=>{
    let name = req.body.Name;
    let username = req.body.username;
    let password = req.body.Password;
    let country = req.body.Country
    let newA = {StudentName : name, Username : username, Password  : password, Country : country};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("Magazine");
    dbo.collection("Student").insertOne(newA);
    res.render('index');
})

router.post('/AdminHomepage', async(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    let client = await MongoClient.connect(url);
    let dbo = client.db("Magazine");
    let result1 = await dbo.collection("Student").find({"username": StudentAccount, "password": StudentPassword}).toArray();
    let result2 = await dbo.collection("Admin").find({"username": AdminAccount, "password": AdminPassword}).toArray();
    if (result1 == 0 && result2 == 0){
        res.redirect('/');
    }
    else if(result1 != 0 && result2 == 0){
        req.session.username = username;
        res.redirect('/StudentHomepage');
    }
    else{
        req.session.username = username;
        res.redirect("/AdminHomepage");
    }
})

router.get('/about',(req,res)=>{
    res.render('about');
})

module.exports = router;