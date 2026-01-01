const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  country: String,
  description: String,
  isPublic: { type: Boolean, default: true },
  password: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('Event', eventSchema);
