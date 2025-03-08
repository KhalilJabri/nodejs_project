const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const signup = async (req, res) => {
  const { name, email, password, role, date_naiss, genre } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (role === 'doctor') {
      const { specialite, salary } = req.body;
      user = new User({ name, email, password, role, specialite, salary, date_naiss, genre });
    } else if (role === 'patient') {
      const { groupe_sanguin, allergies } = req.body;
      user = new User({ name, email, password, role, groupe_sanguin, allergies, date_naiss, genre });
    } else {
      user = new User({ name, email, password, role, date_naiss, genre });
    }
    await user.save();

    // Generate JWT
    const token = generateToken(user);

    res.status(201).json({ token, user: { id: user._id, name, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  console.log('signup success');
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);

    res.json({ token, user: { id: user._id, name: user.name, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  console.log('signin success');
};

module.exports = { signup, signin };