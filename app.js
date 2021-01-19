var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//them cho nay
const cors = require('cors');

const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({extended : true});


app.use(express.static(path.join(__dirname, "build")))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

let mang = ["Android", "ISO", "PHP", "React"];
app.use(cors()); // su dung cors de connect voi reactjs thong qua link

// Configuring body parser middleware
app.use(parser);
app.use(bodyParser.json());

app.post('/getNotes', function(req, res){
    res.send(mang);
});

app.get('/mang', (req, res) => {
  res.send(mang);
});

//nodejs nhan data tu react
//Cach 1:
// app.post('/add',parser, function(req, res){
//   var newNote = req.body.user;
//   mang.push(newNote);
//   console.log(mang);
//   res.send(mang);
// });

//Cach 2:
app.post('/add', (req, res) => {
  var newNote = req.body.user;
  mang.push(newNote);
  console.log(mang);
  res.send(mang);
});

app.post('/delete', (req, res) => {
  var id = req.body.idXoa;
  mang.splice(id, 1);
  console.log(mang);
  res.send(mang);
});

app.post('/update', (req, res) => {
  var id = req.body.idSua;
  mang[id] = req.body.noiDung;
  console.log(mang);
  res.send(mang);
});

//ket thuc them



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
