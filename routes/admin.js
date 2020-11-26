const express = require('express');
// model / schema:
const News = require('../models/news')

const router = express.Router();

// router odpala się w każdym requeście, użytym dla admina , jeśli wyślemy np put, post, get itp, dzięki temu można zweryfikować każdy request idący w stronę /admin, wszytstko będzie chornione sesją, wystarczy tylko zweryfikować istnienie sesji
router.all('*', (req, res, next) => {
  if (!req.session.sessionName) {
    res.redirect('login')
    return;
  }
  // aby wykonały się pozostale requesty:
  next();
})

// app.use(function(req, res, next) {

//   res.locals.path = req.path

//   next();
// })


/* GET home page. */
router.get('/', (req, res) => {
  // pobieranie z db
  News.find({}, (err, data) => {
    // console.log(data);
    res.render('admin/index', { title: 'Admin', data });
  });

  console.log(req.session.sessionName);
  
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', {title: 'Dodaj news', body:{}, errors: {}})
})

// przechwytywanie danych z formularza

router.post('/news/add', (req, res) => {
  const body = req.body;

  const newsData = new News(body);
  // walidacja danych przed save'm
  // pod zmienną errors będą błędy, które ewentualnie wystąpią
  const errors = newsData.validateSync();

  newsData.save((err) => {
    if (err) {
      res.render('admin/news-form', {title: 'Dodaj news', errors, body});
      return;
    } 
    res.redirect('/admin')
  })
  // przekazanie błędów do formularza, żeby je wyświetlać
})


// usuwanie postow

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err)=> {
    res.redirect('/admin')
  })
})




module.exports = router;
