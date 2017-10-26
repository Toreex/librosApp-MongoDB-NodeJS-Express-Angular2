const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3000
const URL_DB = process.env.URL_DB || 'mongodb://localhost:27017/booksdb'



mongoose.promise = global.Promise
mongoose.connect(URL_DB, {useMongoClient: true}, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database ' + URL_DB);
  }
});

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes = require('./routes/books')(app);


app.get('/', function (req, res) {
  res.send('Hello World')
})


app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)