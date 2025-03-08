const mongoose = require('mongoose');


DossierMedicalSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: '', },
  date: { type: Date, default: Date.now, },
  prescription: { type: String, default: '', },
  createdAt: { type: Date, default: Date.now, },
});


module.exports = mongoose.model('DossierMedical', DossierMedicalSchema);