const User = require('../models/user');
const RendezVous = require('../models/rendezvous');


const createRendezVous = async (req, res) => {
  const { patient, doctor, date, time } = req.body;

  try {
    const patientExists = await User.findById({ _id: patient, role: 'patient' });
    if (!patientExists)
      return res.status(400).json({ message: 'Patient not found' });

    const doctorExists = await User.findById({ _id: doctor, role: 'doctor' });
    if (!doctorExists)
      return res.status(400).json({ message: 'Doctor not found' });

    const rendezVousExists = await RendezVous.find({
      doctor: doctorExists._id,
      date: date,
      time: time,
      status: 'approved',
    });

    if (rendezVousExists.length > 0)
      return res.status(400).json({ message: 'Rendez-vous already scheduled' });

    const rendezVous = new RendezVous({ patient, doctor, date, time });
    await rendezVous.save();

    res.status(201).json({ patient: rendezVous.patient, doctor: rendezVous.doctor, date: rendezVous.date, time: rendezVous.time });
    console.log('rendezVous created');

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRendezVousDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const doctorExists = req.user;

    if (doctorExists.role != 'admin' && (doctorExists.role != 'doctor' || doctorExists.id != id)) {
      return res.status(400).json({ message: 'Only doctors can access this route' });
    }

    const rendezVous = await RendezVous.find({
      doctor: id,
      status: 'approved',
    })

    res.status(200).json({ data: rendezVous });
    console.log('• approved rendezVous successfully fetched');

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




// Fonction pour supprimer un rendez-vous
const deleteRendezVous = async (req, res) => {
  const { id } = req.params;

  try {
    const rendezVous = await RendezVous.findById(id);
    if (!rendezVous) {
      return res.status(404).json({ message: 'Rendez-vous not found' });
    }

    await RendezVous.findByIdAndDelete(id);
    res.status(200).json({ message: 'Rendez-vous deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPendingRendezVous = async (req, res) => {
  try {
      // Récupérer les rendez-vous en attente (par exemple, avec un statut 'pending')
      const pendingRendezVous = await RendezVous.find({ status: 'pending' });
      
      if (!pendingRendezVous || pendingRendezVous.length === 0) {
          return res.status(404).json({ message: 'No pending appointments found' });
      }

      res.status(200).json(pendingRendezVous);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching pending appointments' });
  }
};


module.exports = { createRendezVous, getRendezVousDoctor, deleteRendezVous , getPendingRendezVous };