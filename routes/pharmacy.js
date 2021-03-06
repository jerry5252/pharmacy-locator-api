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

router.get("/show/:id", async (req, res) => {
  const pharmacies = await Pharmacy.findOne({ _id: req.params.id });
  // for (i=0; i<pharmacies.length; i++){
  //   if()
  // }
  console.log(pharmacies);
  res.send(pharmacies);
});
router.put("/update/:id", async (req, res) => {

});
router.get("/show", async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.send(pharmacies);
});



router.get("/pharmacyType", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ pharmacyType: "Kenema" });
    res.send(pharmacies);
    try {
      Pharmacy.aggregate()
        .near({
          near: {
            type: "point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          },
          maxDistance: 10000, // in 10k meters
          spherical: true,
          distanceField: "dist.calculated",
        })
        .then(function (pharmacies) {
          console.log(pharmacies);
          res.send(pharmacies);
        });
    } catch (err) {
      res.status(500).json("wrongggggg");
    }
    // try {
    //   if (pharmacies.pharmacyType == "Kenema") {
    //     res.status(200).json(pharmacies);
    //   } else {
    //     res.status(400).json(err);
    //   }
    // } catch (err) {
    //   res.status(300).json(err);
    // }
  } catch (err) {
    res.status(500).json("wrongggggg");
  }
});
router.get("/pharmacyType/Kenema", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ pharmacyType: "Kenema" });
    res.send(pharmacies);

  } catch (err) {
    res.status(500).json("wrongggggg");
  }
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

//UPADTE PHARMACY
router.put("/update/:id", async (req, res, next) => {
  await Pharmacy.findByIdAndUpdate(
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
        console.log("Pharmacy updated successfully !");
      }
    }
  );
});

//update pharmacy 2
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcryptgenSalt(10)
    }
  }
  try {
    const updatedUser = await Pharmacy.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//router.get("/nearest")
router.get("/nearest", function (req, res, next) {
  console.log(req.query);
  Pharmacy.aggregate()
    .near({
      near: {
        type: "point",
        coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      },
      maxDistance: 1000, // in 1k meters
      spherical: true,
      distanceField: "dist.calculated",
    })
    .then(function (pharmacies) {
      //console.log(pharmacies);
      // console.log("===========================", pharmacies);
      // var data = {};
      // data.features = pharmacies;
      // // console.log("data: ", data);
      // var mainData = {};
      // mainData.features = [];
      // for (var i = 0; i < data.features.length; i++) {
      //   var tmp = {};
      //   tmp.type = "Feature";
      //   tmp.properties = {};
      //   tmp.properties.pharmacy_id = data.features[i]._id;
      //   tmp.properties.pharmacyName = data.features[i].pharmacyName;
      //   tmp.properties.phoneNumber = data.features[i].phoneNumber;
      //   tmp.properties.openingHr = data.features[i].openingHr;
      //   tmp.properties.closingHr = data.features[i].closingHr;
      //   tmp.properties.email = data.features[i].email;
      //   tmp.properties.description = "Advil";
      //   // location
      //   var geometry = {};
      //   geometry.type = "Point";
      //   geometry.coordinates = data.features[i].location.coordinates;
      //   tmp.geometry = geometry;
      //   // mainData.push(tmp);
      //   mainData.features.push(tmp);
      // }

      console.log(pharmacies);
      res.status(200).json(pharmacies);
    });
});

module.exports = router;
