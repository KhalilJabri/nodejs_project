const User = require('../models/user');
const RendezVous = require('../models/rendezvous');
const rendezvous = require('../models/rendezvous');


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

const getRendezVousPatient = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du patient
    const patientExists = req.user; // L'utilisateur connecté

    if (patientExists.role !== 'admin' && (patientExists.role !== 'patient' || patientExists.id !== id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const rendezVous = await RendezVous.find({ patient: id }).lean();

    if (!rendezVous.length) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    res.status(200).json({ data: rendezVous });
    console.log('✅ Patient rendezVous fetched successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateRendezVouStatus = async (req , res)=> {
  try {
    const { id } = req.params; // Récupérer l'ID du patient
    const doctorExists = req.user; // L'utilisateur connecté
  const { status} = req.body;

 /*   if (status !== "approuved" | "canceled" | "rejected" | "pending" ) {
      return res.status(400).json({ message: 'Status should be "approuved" | "canceled" | "rejected" | "pending" ' });
      
    }*/
    if (doctorExists.role != 'doctor') {
      return res.status(400).json({ message: 'Only doctors can access this route' });
    }
   const existRendezVous = await rendezvous.findById(id);
    if (!existRendezVous) {
      return res.status(404).json({ message: 'rendezvous with this id not found' });
      
    }
if (status === "approuved") {
  let approvedRendezVous = await rendezvous.find({
    date: existRendezVous.date,
    time: existRendezVous.time,
      });
  approvedRendezVous = approvedRendezVous.filter((r)=> r.id !== id)
  if(approvedRendezVous.length !== 0){
    return res.status(400).json({ msg : "you have rendevous on this date and time" });
  }else{
  const update = await rendezvous.updateOne({_id: id},{status:status})
  const after = await rendezvous.findById(id);
   return res.status(200).json({ msg : "updated" , before:existRendezVous , after : after});
  }  
} else {
  const update = await rendezvous.updateOne({_id: id},{status:status})
  const after = await rendezvous.findById(id);
   return res.status(200).json({ msg : "updated" , before:existRendezVous , after : after});
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
module.exports = { createRendezVous, getRendezVousDoctor, deleteRendezVous, getPendingRendezVous, getRendezVousPatient , updateRendezVouStatus };
