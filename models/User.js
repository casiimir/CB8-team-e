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
<<<<<<< HEAD
    enum: ["user", "business"],
  },
  businessName: {  
    type: String,
    required: false,
  },
  imageProfile: {
    type: String, 
=======
  },
  // categoria type stringa o enum ["user", "organizzatore"]
  businessName: {
    type: String,
    required: false,
  },
  // businessName e userName sono la stessa cosa?
  imageProfile: {
    type: String, // Stringa????
>>>>>>> refs/remotes/origin/Database-configuration
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

<<<<<<< HEAD

module.exports =
  mongoose.models.User || mongoose.model("user", UserSchema);
=======
module.exports =
  mongoose.models.UserSchema || mongoose.model("user", UserSchema);
>>>>>>> refs/remotes/origin/Database-configuration
