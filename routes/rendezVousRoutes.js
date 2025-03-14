const express = require('express');
const { createRendezVous, getRendezVousDoctor, getRendezVousPatient } = require('../controllers/rendezVousController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createRendezVous);
router.get('/doctor/:id', authMiddleware, getRendezVousDoctor);
router.get('/patient/:id',authMiddleware,getRendezVousPatient);
module.exports = router;
