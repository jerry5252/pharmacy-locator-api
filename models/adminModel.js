const mongoose = require("mongoose");
const admin = new mongoose.Schema({
    adminName: {
        type: String,
        // required: true,
        unique: false,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        // require: true,
    },
    userName: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("adminTable", admin);
