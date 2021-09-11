const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const pharmacyCopy = require("../models/pharmacyModel");

router.post("/sign-up", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(request.body.password, salt);

  let found = false;
  const pharmacyCheck = await pharmacyCopy.find();
  pharmacyCheck.forEach((ac) => {
    if (ac.userName === request.body.userName) {
      found = true;
      return;
    }
  });

  if (found) return response.status(500).send("username taken");
  const newPharmacy = new pharmacyCopy({
    pharmacyName: request.body.pharmacyName,
    phoneNumber: request.body.phoneNumber,
    location: request.body.location,
    openingHr: request.body.openingHr,
    closingHr: request.body.closingHr,
    TIN_number: request.body.TIN_number,
    businessLicense: request.body.businessLicense,
    pharmacyType: request.body.pharmacyType,
    email: request.body.email,
    userName: request.body.userName,
    password: password,
  });

  const result = await newPharmacy.save();
  console.log(result);
  response.status(200).send(result);
});

router.post("/sign-in", async (req, res) => {
  console.log(req.body.userName, req.body.password);
  const pharmacy = await pharmacyCopy.findOne({
    userName: req.body.userName,
  });
  //console.log("id:", pharmacy._id);
  const id = pharmacy._id;
  if (pharmacy.length < 1) {
    return res.status(400).send("user name or password not correct");
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    pharmacy.password
  );
  if (validPassword) {
    console.log(pharmacy._id.toString());
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
module.exports = router;
