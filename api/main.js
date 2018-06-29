var express = require('express')
var router = express.Router()
var text = require('./model/text')

// route to show a random message (GET http://localhost:8080/api/)
router.get('/', function (req, res) {
    res.json({
      message: 'Welcome to the coolest API on earth!'
    });
  });

router.use('/text',require('./routes/text-api'))
router.use('/image',require('./routes/image-process'))
router.use('/game',require('./routes/game'))

module.exports = router;
