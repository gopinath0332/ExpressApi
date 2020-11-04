var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require("mongoose");
const url = "mongodb://localhost/CarsDB";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter = require("./routes/cars");
var userRouter = require("./routes/user");
var session = require("express-session");
const withAuth = require("./routes/middleware");

var app = express();
mongoose.connect(url, {
  useNewUrlParser: true
});
const dbConnection = mongoose.connection;

dbConnection.on("open", () => {
  console.log("Connected to MongoDb");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.disable('x-powered-by')
app.use(cookieParser());
// check user valid authentication
// app.use(withAuth);
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/v1/cars", carsRouter);
app.use("/v1/user", userRouter);
app.get('/', function (req, res) {
  var body = '';
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});
// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     console.log("sessions destroyed --");
//   })
//   // res.redirect("/users")
//   res.send("success");
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;