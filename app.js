// var Knex = require("knex")
// var knexConfig = require("./knexfile.js").development;
// var knex = Knex(knexConfig)

var express = require('express')
var expresshbs = require('express-handlebars')
var path = require('path')
var bodyParser = require('body-parser')
var imdb = require('imdb-api');

var app = express()

module.exports = app;

//Handlebars engine
app.engine('handlebars', expresshbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body-parser makes a JSON body object out of request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", function(req, res){
  res.redirect("/home")
})

app.get("/home", function(req, res) {
  res.render("home")
})

app.post("/home", function(req, res) {
  var search = req.body
  imdb.getReq(search, function(err, data){
    if (err) {console.log("Not found")}
    var moviePoster = data.poster
    var moviePlot = data.plot
    var movieScore = data.rating
    console.log(moviePoster, moviePlot, movieScore)
  })
})

// Test imdb-api package
// imdb.getReq({name: "matrix"}, function(err, data){
//   if (err) {console.log("Not found")}
//   var movieScore = data.rating
//   console.log(data)
//   console.log(movieScore)
// })