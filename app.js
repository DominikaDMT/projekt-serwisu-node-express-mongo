var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// utworzymy teraz funkcję, która będzie routem (uproszczonym), ona będzie z requestu pobierała aktualny adres strony i będzie on przekazywany do każdego widoku - pobieramy, przypisujemy zmienną, która będzie przekazywana do wszystkich widoków i puszczamy skrypt dalej (metoda next - sprawia, że skrypt nie zatryma się na danym routingu, tylko pójdzie do pozostałych )

app.use(function(req, res, next) {
  // console.log(req.path);
  // przekazujemy to za pomocą gloalnych zmiennych do szablonów - aby to zrobić trzeba przypisać req.path przypisać do responsa z lokalnymi zmiennymi:
  res.locals.path = req.path
  // dzięki temu jest on dostępny globalnie w szablonach
  next();
})


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);

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
