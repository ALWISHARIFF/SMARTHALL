const mongoose = require("mongoose");

const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
