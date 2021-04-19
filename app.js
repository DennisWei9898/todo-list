// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

const bodyParser = require('body-parser')

const Todo = require('./models/todo')

const routes = require('./routes')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定引擎

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
