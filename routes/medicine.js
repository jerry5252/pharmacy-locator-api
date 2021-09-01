const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Medicine = require("../models/medicineModel");
const pharmacyCopy = require("../models/pharmacyModel");

router.post("/add", async (req, res) => {
  const newMedicine = new Medicine({
    medName: req.body.medName,
    medType: req.body.medType,
    medPrice: req.body.medPrice,
    manufactureDate: req.body.manufactureDate,
    expirationDate: req.body.expirationDate,
    pharmacy: req.body.pharmacy,
  });
  try {
    const result = await newMedicine.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("pharmacy");
    res.send(medicines);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/search", async (req, res) => {
  try {
    const medicines = await Medicine.find({
      medName: { $regex: req.query.q, $options: "i" }, // use query as regular expression to search
    })
      .sort("medName")
      .populate("pharmacy");
    return res.send(medicines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//UPADTE MEDICINE
router.put("/update/:id", async (req, res, next) => {
  await Medicine.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Medicine updated successfully !");
      }
    }
  );
});

// DELETE MEDICINE
router.delete("/delete/:id", (req, res, next) => {
  Medicine.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
