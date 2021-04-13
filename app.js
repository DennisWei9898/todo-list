// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const Todo =require('./models/todo')

const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/todo-list',{ useNewUrlParser: true ,useUnifiedTopology:true})

const db = mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{

  console.log('mongodb connected!')
})

//設定引擎

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

app.use(bodyParser.urlencoded({extended:true}))

// 設定首頁路由
app.get('/', (req, res) => {

  //拿到全部的todo資料
  Todo.find()
      .lean()
      .then(todos=>res.render('index',{todos}))
      .catch(error=>console.log(error))
})

app.get('/todos/new',(req,res)=>{
  return res.render('new')

})

app.get('/todos/:id', (req,res)=>{
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail',{todo}))
    .catch(error => console.log(error))

})

app.post('/todos',(req,res)=>{
  const name = req.body.name

  // const todo = new Todo({
  //   name
  // })
  // return todo.save()
  // .then(()=>res.redirect('/'))
  // .catch(error=>console.log(error))

  return Todo.create({name})
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))

})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})