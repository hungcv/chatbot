const express = require('express')
const router = express.Router()
var randomInt = require('random-int')
var GameUser = require('../model/game-user')
var GameCampain = require('../model/game-campain')

router.get('/', function(req, res) {
    var from = 0
    var to = 100
    if (typeof req.query !== 'undefined') {
        console.log(req.query)
        if (typeof req.query.from !== 'undefined') {
            from = parseInt(req.query.from)
        }

        if (typeof req.query.to !== 'undefined') {
            to = parseInt(req.query.to)
        }
    } 
    res.send({messages:[{text: 'Your code is: ' + randomInt(from, to)}]})
})

router.post('/random-number', function(req, res) {
    var from = 1000
    var to = 9999
    if (typeof req.body !== 'undefined' && 
    typeof req.body.fullname !== 'undefined') {
        console.log(req.query)
        var user = new GameUser()
        if (typeof req.body.fullname !== 'undefined') {
            user.fullname = req.body.fullname
        }

        if (typeof req.body.phone !== 'undefined') {
            user.phone = req.body.phone
        }

        if (typeof req.body.messenger_user_id !== 'undefined') {
            user.messenger_user_id = req.body.messenger_user_id
        }

        if (typeof req.body.game_id !== 'undefined') {
            user.game_id = req.body.game_id
        }
        
        GameUser.find({
            game_id: user.game_id
        }, function(err, users) {
            if(err) {
                res.send('Error occur, please try again')
            } else {
                while(typeof user.number === 'undefined') {
                    var number = randomInt(from,to)
                    var existing = false
                    for (u in users) {
                        if(u.number == number ){
                            existing = true
                            break
                        }
                    }

                    if(!existing) {
                        user.number = number
                    }
                }

                user.save(function (err) {
                    if (err) {
                        res.send('Error occur, please try again\n'+ err)
                    } else {
                        res.send({messages:[{text: 'Con số may măn của bạn : ' + user.number}]})
                    }
                  });
            }
        })
    } else {
        res.send({messages:[{text: 'Missing parameter'}]})
    }
})

router.post('/choose1', function(req, res) {
    if (typeof req.body !== 'undefined' && 
    typeof req.body.game_id !== 'undefined') {
        GameUser.find({
            game_id: req.body.game_id
        }, function(err, users) {
            if(err) {
                res.status(300)
                res.send('Error:'+ err)
            } else if(users.length == 0) {
                res.send(' Chưa có ai chơi cả! @@')
            } else {
                var index = randomInt(0,users.length-1);
                res.send(users[index])
            }
        })
    } else {
        res.status(400)
        res.send('Missing game id')
    }
})

router.post('/create', function(req, res) {
    if (typeof req.body !== 'undefined' && 
    typeof req.body.name !== 'undefined') {
        GameCampain.create({ name: req.body.name }, function (err, gamecampain) {
            if (err) {
                res.send('Existing Game Name, Please choose another Game Name')
            } else {
                res.send(gamecampain)
            }
          });
    } else {
        res.send('Missing game name!')
    }
})

router.post('/user', function(req, res) {
    if (typeof req.body !== 'undefined' && 
    typeof req.body.game_id !== 'undefined') {
        GameUser.find({game_id: req.body.game_id}, function(err, users) {
            if (err) {
                res.status(400)
                res.send('error '+ err)
            } else {
                res.send(users)
            }
        })
    } else {
        res.status(400)
        res.send('Missing game_id!')
    }
})

module.exports = router
