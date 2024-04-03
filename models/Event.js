const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  // ID ORGANIZZATORE DA AGGIUNGERE ???
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Per aggiungere extra come Accessibilità, Under 18 etc possiamo utilizzare il placeholder della text area? e se rimane tempo lo implementiamo?
  date: {
    type: String, //4/04/2024
    required: true,
  },
  time: {
    type: String, //19:00
    required: true,
  },
  poster: {
    type: String, // Stringa????
    required: true,
    default: "img-default",
  },
  city: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.EventSchema || mongoose.model("Event", eventSchema);
