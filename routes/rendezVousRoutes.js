const express = require('express');
const { createRendezVous, getRendezVousDoctor } = require('../controllers/rendezVousController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createRendezVous);
router.get('/doctor/:id', authMiddleware, getRendezVousDoctor);

module.exports = router;
