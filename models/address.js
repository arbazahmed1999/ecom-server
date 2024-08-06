const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  name: String,
  address: String,
  pincode: String,
  city: String,
});

const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel;

