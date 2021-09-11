const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const search = require("../models/search");

router.post("/search", async (req, res) => {
    const query = req.body.query
    await search.findOneAndUpdate({ Name: query }, { upsert: true })

});
module.exports = router;