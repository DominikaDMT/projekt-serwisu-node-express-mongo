const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1


router.get('/', (req, res) => {
  // Pobranie danych z wyszukiwarki
  console.log(req.query);
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1 ) {
    sort = defaultSort;
  }

  const findNews = News
  // trim - pomijanie spacji
  .find({title: new RegExp(search.trim(), 'i')})
  .sort({created: sort})
  // wybieranie które pola z db mają się wyświetlać:
  .select('_id title description');
  //  -1 malejąco, 0 domyslnie, 1 rosnąco
  
  findNews.exec((err, data) => {
    // console.log(data);
    res.json(data);
  })
});

//  do pobierania jednego artykulu
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const findNews = News.findById(id).select('_id title description');
  
  findNews.exec((err, data) => {
    // console.log(data);
    res.json(data);
  })

});

module.exports = router;
