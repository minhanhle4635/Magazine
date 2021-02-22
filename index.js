const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb+srv://minhanhle:minhanh12345@cluster0.nqhz7.gcp.mongodb.net/test';

router.get('/',(req,res)=>{
    req.session.username = null;
    res.render('index');
})

router.post('/homepage', async(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;

    let client = await MongoClient.connect(url);
    let dbo = client.db("Magazine");
    let result = await dbo.collection("Student").find({"username": StudentAccount, "password": StudentPassword}).toArray();
    if (result == 0){
        res.redirect('/');
    }
    else{
        req.session.username = username;
        res.redirect("/homepage");
    }
})

router.get('/about',(req,res)=>{
    res.render('about');
})

module.exports = router;