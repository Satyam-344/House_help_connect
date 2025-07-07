const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skills: [String],
  experience: Number,
  location: String,
  availability: { type: String, enum: ['full-time', 'part-time'] },
  rate: String
});

module.exports = mongoose.model('Worker', workerSchema);
