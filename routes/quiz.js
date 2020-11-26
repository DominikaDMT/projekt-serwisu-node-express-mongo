const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  // pierwotnie będzie to 1 lub undefined, a po zanegowaniu: 0 lub true
  const show = !req.session.vote;


  // poniższa linijka dodała pierwszy model do bazy
  // new Quiz({title: 'Pytanie 1', vote: 0}).save();

  Quiz.find({}, (err, data) => {
    // zsumowanie ilości odpowiedzi
    let sum = 0
    data.forEach(item => {
      sum += item.vote
    })


    // console.log(data);
    res.render('quiz', { title: 'Quiz', data, show, sum});

  })
});

// przekierowanie po kliknięcu 'Zagłosuj'
router.post('/', (req, res) => {
  // poniżej req.body.quiz, ponieważ ustaliliśmy w pugu nazwę radiobuttona na quiz
  const id = req.body.quiz

  Quiz.findOne({_id: id }, (err, data) => {
    data.vote = data.vote + 1;
    // bezpośrednia zmiana w wyszukanym findOne i zapisanie
    data.save((err) => {
      // poniżej dodanie sesji z oddanym głosem, a przy wywoałaniu get będzie sprawdzenie, czy istnieje już zapis sesji
      req.session.vote = 1;
      res.redirect('/quiz');
    })
    // redirect wykona się dopiero, gdy nastąpi save
  })
});

module.exports = router;

// Zamiast zabezpieczać sesją, można zapisywać IP uzytkownika do bazy danych i porónywać, jedno rozwiązanie nie wyklucza drugiego