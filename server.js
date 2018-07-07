var express = require('express')
var router = express.Router()
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('Database connected!')
})

// app.get('*', (req, res) => {
//   res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// body parser 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({type: 'application/json'}))
console.log("__dirname: "+ __dirname);

app.use('/api', require('./api/main.js'))

// app.get('/', function(req, res){
//   res.send("Hello World! Server working");
// });

app.listen(8080, () => console.log('Example app listening on port 8080!'))
