var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    numOfPages: {
        type: Number,
        required: true
    },
    dateFrom: {
        type: Date,
        required: false
    },
    dateTo: {
        type: Date,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
})

var BookModel = mongoose.model('book', BookSchema)


module.exports = BookModel