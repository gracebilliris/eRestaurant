module.exports = mongoose => {
  const Booking = mongoose.model(
    "booking",
    mongoose.Schema(
      {
        username: String,
        date: String,
        time: String,
        seats: String
      },
    )
  );
  return Booking;
}