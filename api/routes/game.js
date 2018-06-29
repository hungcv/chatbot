const express = require('express')
const router = express.Router()
var randomInt = require('random-int')


router.get('/', function(req, res) {
    var from = 0
    var to = 100
    if (req.query !== 'undefind') {
        console.log(req.query)
        if (req.query.from !== 'undefind') {
            from = parseInt(req.query.from)
        }

        if (req.query.to !== 'undefind') {
            to = parseInt(req.query.to)
        }
    } 
    res.send({messages:[{text: 'Your code is: ' + randomInt(from, to)}]})
})

module.exports = router
