const express = require('express');
var cors = require('cors')

const { moongose } = require('./db');
var config = require("./config")
var authRoutes = require('./routes/auth')
var bookRoutes = require('./routes/book')
var passport = require('./routes/config/passport')

var app = express();

var corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST, DELETE, PUT"
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(passport.initialize())
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("There was an error.")
})

app.use('/auth', authRoutes)
app.use('/books', bookRoutes)

app.listen(config.port, () => {
    console.log(`Running on port: ${config.port}`)
})