const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
    telephone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    mode: {
      type: String,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    cancelled: {
      type: Boolean,
      required: true,
      default: false,
    },
    allday: {
      type: Boolean,
      required: true,
      default: false,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Venue",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Bookings", bookingSchema);
module.exports = Booking;
