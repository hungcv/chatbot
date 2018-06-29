const express = require('express');
const router = express.Router();

var Text = require('../model/text')

router.get('/', function(req, res) {
    Text.find({}, function(err, texts) {
        res.send(texts);
    })
})

router.post('/', function(req, res){
    console.log('body: ', req.body)
    if(typeof req.body !== 'undefined' && typeof req.body.text !== 'undefined'){
        var t = new Text({text: req.body.text})
        t.save(function(err, success) {
            if (err) {
                console.error(err)
                res.send("error "+ err)
            } else {
                res.send(success);
            }
        })
    } else {
        res.send('Content is empty')
    }
})

module.exports = router
