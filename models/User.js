const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  // categoria type stringa o enum ["user", "organizzatore"]
  businessName: {
    type: String,
    required: false,
  },
  // businessName e userName sono la stessa cosa?
  imageProfile: {
    type: String, // Stringa????
    required: true,
    default: "img-default",
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.UserSchema || mongoose.model("user", UserSchema);
