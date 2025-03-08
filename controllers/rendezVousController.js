const User = require('../models/user');
const RendezVous = require('../models/rendezvous');


const createRendezVous = async (req, res) => {
    const { patient, doctor, date, time } = req.body;
  
    try {
      const rendezVous = new RendezVous({ patient, doctor, date, time });
      await rendezVous.save();
  
      res.status(201).json({ rendezVous });
      console.log('rendezVous created');
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
  module.exports = {createRendezVous };