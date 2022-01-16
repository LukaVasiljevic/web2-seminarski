const { } = require('express');
const express = require('express');

var Book = require('../models/book')

var router = express.Router();

router.get('/:userId', async (req, res) => {
    var books = await Book.find({ 'userId': req.params.userId }).sort('-dateFrom');
    res.status(200).json(books);
});

router.post('/', async (req, res) => {
    var book = new Book();
    book.title = req.body.title;
    book.author = req.body.author
    book.numOfPages = req.body.numOfPages
    book.dateFrom = req.body.dateFrom
    book.dateTo = req.body.dateTo
    book.userId = req.body.userId;

    book.save((err) => {
        if (!err) {
            res.status(200).send(book);
        }
        else {
            res.status(420).send(err);
        }
    })
});

router.put('/', async (req, res) => {
    var book = {
        title: req.body.title,
        author: req.body.author,
        numOfPages: req.body.numOfPages,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        userId: req.body.userId
    }
    Book.findByIdAndUpdate(req.body._id, { $set: book, new: true }, (err, b) => {
        if (!err) res.status(200).send(b);
    });
});

router.delete('/:id', async (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, b) => {
        if (!err) res.status(200).send(b);
    });
});

router.get('/book/:id', async (req, res) => {
    var b = await Book.findById(req.params.id);
    res.status(200).json(b);
});


module.exports = router;