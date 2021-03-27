const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const app = express()
let db = require('./db').db().collection("comments")
let data 

let sessionOptions = session({
  secret: "JavaScript is sooooooooo coool",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.post('/create-item',function(req,res){
  date = new Date()
  data = {
      text: req.body.text,
      yorum: req.body.text2,
      date: date.toLocaleString()
  }

  db.insertOne(data, function(err, info){
      res.json(info.ops[0])
  })
  
})

app.use('/', router)

module.exports = app