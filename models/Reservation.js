const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  eventId: {
    type: Number,
    required: true,
  },
  ticketsBooked: {
    type: Number,
    required: true,
  },
});

module.exports =
  mongoose.models.ReservationSchema ||
  mongoose.model("reservation", ReservationSchema);
