const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const search = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Count: {
        type: Number,
        required: true,
    }
});


module.exports = mongoose.model("searchtable", search);
