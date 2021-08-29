const express = require("express");
const router = express.Router();
const Pharmacy = require("../models/pharmacyModel");
const Medicine = require("../models/medicineModel");

router.post("/", async (req, res) => {
  const newPharmacy = new Pharmacy({
    pharmacyName: req.body.pharmacyName,
    phoneNumber: req.body.phoneNumber,
    pharmacyType: req.body.pharmacyType,
    location: req.body.location,
    openingHr: req.body.openingHr,
    closingHr: req.body.closingHr,
    TIN_number: req.body.TIN_number,
    businessLicense: req.body.businessLicense,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  });
  try {
    const result = await newPharmacy.save();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/show", async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.send(pharmacies);
});

router.get("/:id/meds", async (req, res) => {
  try {
    const meds = await Medicine.find({ pharmacy: req.params.id });
    return res.send(meds);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = router;
