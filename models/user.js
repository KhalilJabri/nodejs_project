const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true, default: '', },
  email: {type: String, required: true, unique: true, trim: true, lowercase: true, },
  password: {type: String, required: true, minlength: 6, },
  date_naiss: { type: Date, default: Date.now, },
  genre: { type: String, default: '', },
  genre: { 
    type: String, 
    enum: ['male', 'female'], // Allowed values
    default: ''
  },
  role: { 
    type: String, 
    enum: ['admin', 'doctor', 'patient'], // Allowed values
  },
  groupe_sanguin: { type: String, default: '', },
  specialite: { type: String, default: '', },
  salary: { type: Number, default: 0, },
  allergies: { type: String, default: '', },
  code: { type: String, default: '', },
  createdAt: { type: Date, default: Date.now, },
});

// Create a compound unique index for email and role
// userSchema.index({ email: 1, role: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export model 
module.exports = mongoose.model('User', userSchema);