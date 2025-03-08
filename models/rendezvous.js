const mongoose = require('mongoose');

rendezVousSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  date: { type: Date, required: true, default: Date.now }, // Stores date (YYYY-MM-DD)
  time: { type: String, required: true, default: '' }, // Example: "14:00"
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RendezVous', rendezVousSchema);
