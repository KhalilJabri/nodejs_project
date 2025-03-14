const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createRendezVous,  getRendezVousDoctor ,deleteRendezVous , getPendingRendezVous, getRendezVousPatient , updateRendezVouStatus} = require('../controllers/rendezVousController');

router.post('/create', authMiddleware, createRendezVous);
router.get('/:id/approved', authMiddleware, getRendezVousDoctor);
router.delete('/delete/:id', authMiddleware, deleteRendezVous);
router.get('/pending', authMiddleware, getPendingRendezVous);
router.get('/patient/:id',authMiddleware,getRendezVousPatient);
router.patch('/update-status/:id',authMiddleware,updateRendezVouStatus);


module.exports = router;
