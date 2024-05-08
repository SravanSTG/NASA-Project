const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// The model name or the first argument must always be a singular name
// MongoDB will take the singular name, lower case it, make it plural and assign it as the collection name
// In this case MongoDB will create a collection called 'launches' and connect it to launchesSchema
module.exports = mongoose.model("Launch", launchesSchema);
