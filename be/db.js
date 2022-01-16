var config = require("./config")
const moongose = require('mongoose');

moongose.connect(config.dbConnection, (err) => {
    if (!err)
        console.log("MongoDB connection succeeded.")
    else
        console.log("DB error" + err);
});

module.exports = moongose;

