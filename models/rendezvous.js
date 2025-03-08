const mongoose = require('mongoose');

rendezVousSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: { type: Date, required: true, default: Date.now }, // Stores date (YYYY-MM-DD)
  time: { type: Date, required: true, default: Date.now}, // Stores time (HH:MM:SS)
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
