const mongoose = require("mongoose");
const pharmacy = require("./pharmacyModel");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const medicine = new mongoose.Schema({
  medName: {
    type: String,
    required: true,
    unique: false,
    minlength: 5,
    maxlength: 50,
    index: true,
  },
  medType: {
    type: String,
    enum: ["Prescriped Only", "Prenatal", "Antibiotics", "Others"],
    required: true,
  },
  medPrice: {
    type: Number,
    required: true,
  },
  manufactureDate: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  pharmacy: {
    type: ObjectId,
    ref: "pharmacyTable",
  },
});

// medicine.index({ medName: "text" });

module.exports = mongoose.model("medicineTable", medicine);
