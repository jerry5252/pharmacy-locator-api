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

router.get("/searchMed", async (req, res) => {
  try {
    const medicines = await Medicine.find({
      medName: { $regex: req.query.q, $options: "i" }, // use query as regular expression to search
    })
      .sort("medName")
      .populate("pharmacy");
    res.send(medicines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Customer searching for a medicine
router.get("/search", async (req, res) => {
  const pharmacyResults = [];
  try {
    const medicines = await Medicine.find({
      medName: { $regex: req.query.q, $options: "i" }, // use query as regular expression to search
    })
      .sort("medName")
      .populate("pharmacy");
    for (i = 0; i < medicines.length; i++) {
      pharmacyResults[i] = medicines[i].pharmacy;
      //console.log(medicines[i].pharmacy);
    }
    const pharmasClose = await pharmacyCopy.aggregate().near({
      near: {
        type: "Point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      },
      maxDistance: 1000, // in 1k meters
      spherical: true,
      distanceField: "dist.calculated",
    });

    const pharmasWithMed = [];
    for (i = 0; i < pharmacyResults.length; i++) {
      for (j = 0; j < pharmasClose.length; j++) {
        if (pharmacyResults[i].pharmaName === pharmasClose[j].pharmaName) {
          pharmasWithMed[i] = pharmacyResults[i];
        }
      }
    }
    console.log(pharmasWithMed);
    res.send(pharmasWithMed);
    res.send(medicines);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// router.get("/nearest", function (req, res, next) {
//   Pharmacy.aggregate()
//     .near({
//       near: {
//         type: "point",
//         coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
//       },
//       maxDistance: 1000, // in 1k meters
//       spherical: true,
//       distanceField: "dist.calculated",
//     })
//     .then(function (pharmacies) {
//       console.log(pharmacies);
//       res.send(pharmacies);
//     });
// });

router.post("/showMed", (req, res) => {});
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

//get medicines of a certain pharmacy
router.get("/pharmaMeds/:id", async (req, res) => {
  try {
    const medicines = await Medicine.find({ pharmacy: req.params.id });
    console.log(medicines);
    res.send(medicines);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
module.exports = router;
