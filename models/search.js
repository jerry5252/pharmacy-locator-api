const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const search = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("searchtable", search);
