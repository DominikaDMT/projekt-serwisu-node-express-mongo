const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
  // Pobranie danych z wyszukiwarki
  console.log(req.query);
  const search = req.query.search || '';


  const findNews = News
  // trim - pomijanie spacji
  .find({title: new RegExp(search.trim(), 'i')})
  .sort({created: -1});
  //  -1 malejąco, 0 domyslnie, 1 rosnąco
  
  findNews.exec((err, data) => {
    // console.log(data);
    res.render('news', { title: 'News', data, search });
  })

});

module.exports = router;
