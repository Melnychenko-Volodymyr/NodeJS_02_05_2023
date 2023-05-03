const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('page');
});

let articles = [
    { title: 'Заголовок 1', text: 'Це текст статті №1'},
    { title: 'Заголовок 2', text: 'Це текст статті №2'}
];

// відправка масиву статей на запит get
router.get('/article', (req, res) => {
    res.send(articles);
});

// отримання нової статті, додавання її в масив і відправка у відповідь оновленого масиву
router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data);
    articles.push(data);
    res.json(articles);
  });

module.exports = router;