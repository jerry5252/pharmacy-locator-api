const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminCopy = require("../models/adminModel");
const Pharmacy = require("../models/pharmacyModel");


router.post("/sign-up", async (request, response) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);

    let found = false;
    const adminCheck = await adminCopy.find();
    adminCheck.forEach((ac) => {
        if (ac.userName === request.body.userName) {
            found = true;
            return;
        }
    });

    if (found) return response.status(500).send("username taken");
    const newAdmin = new adminCopy({
        adminName: request.body.adminName,
        email: request.body.email,
        userName: request.body.userName,
        password: password,
    });

    const result = await newAdmin.save();
    console.log(result);
    response.status(200).send(result);
});

router.post("/sign-in", async (req, res) => {
    console.log(req.body.userName, req.body.password);
    const admin = await adminCopy.findOne({
        userName: req.body.userName,
    });
    //console.log("id:", pharmacy._id);
    const id = admin._id;
    if (admin.length < 1) {
        return res.status(400).send("user name or password not correct");
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
    );
    if (validPassword) {
        console.log(admin._id.toString());
        return res.status(200).send(id);
        // const token = jwt.sign(
        //   {
        //     id: admin._id.toString(),
        //     role: admin.role,
        //   },
        //   process.env.JWT_SECRET
        // );

        //     res.cookie("auth", token).send(token);
        //     console.log(req.cookies);
        //     // res.status(200).send(admin);
    } else {
        res.status(500).send("user name or password not correct after");
    }
});
router.get("/show/:id", async (req, res) => {
    const admins = await admin.findOne();
    res.send(admins);
});
router.get('/numbers', async (req, res) => {
    const pharmaCount = await Pharmacy.find().then(pharmas => pharmas.length)
    const adminCount = await adminCopy.count()
    const requestCount = await Pharmacy.find({ notVerified: true }).then(pharmas => pharmas.length);

    return res.send({ pharmaCount, adminCount, requestCount })
})

module.exports = router;
