const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const search = require("../models/search");

router.post("/", async (req, res) => {
    const query = req.body.query
    search.findOneAndUpdate({ name: query }, { $inc: { count: 1 } }, { new: true, upsert: true }).then(search => res.send(search)).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
    // res.send(search)
});

router.get("/", async (req, res) => {
    const queries = await search.find({}).sort({ "count": -1 });
    return res.send(queries.slice(0, 10));
})
module.exports = router;