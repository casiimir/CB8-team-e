const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: {
<<<<<<< HEAD
    type: String,
    required: true,
  },
  eventId: {
    type: String,
=======
    type: Number,
    required: true,
  },
  eventId: {
    type: Number,
>>>>>>> refs/remotes/origin/Database-configuration
    required: true,
  },
  ticketsBooked: {
    type: Number,
    required: true,
  },
});

module.exports =
<<<<<<< HEAD
  mongoose.models.Reservation ||
=======
  mongoose.models.ReservationSchema ||
>>>>>>> refs/remotes/origin/Database-configuration
  mongoose.model("reservation", ReservationSchema);
