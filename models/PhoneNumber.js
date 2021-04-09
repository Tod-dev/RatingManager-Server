const mongoose = require("mongoose");

const rate = new mongoose.Schema({ rating: Number, date: Date });
const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  ratings: [rate],
});

module.exports = mongoose.model("phoneNumber", phoneNumberSchema);
