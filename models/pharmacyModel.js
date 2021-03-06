const mongoose = require("mongoose");
const medicineCopy = require("./medicineModel");
const bcrypt = require("bcrypt");

const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: true,
  },
});

const pharmacy = new mongoose.Schema({
  pharmacyName: {
    type: String,
    required: true,
    unique: false,
    minlength: 5,
    maxlength: 50,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: false,
    minlength: 10,
    maxlength: 12,
  },
  pharmacyType: {
    type: String,
  },
  location: GeoSchema,
  openingHr: {
    type: Number,
    required: true,
  },
  closingHr: {
    type: Number,
    required: true,
  },
  TIN_number: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  businessLicense: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
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
  profilePic: {
    type: String,
    default: "",
  },
});

// pharmacy.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// pharmacy.methods.hasPassword = async function (candidate) {
//   return bcrypt.compare(candidate, this.password);
// };

module.exports = mongoose.model("pharmacyTable", pharmacy);
