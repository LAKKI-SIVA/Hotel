const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings
};
