const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createRendezVous, getRendezVousDoctor } = require('../controllers/rendezVousController');

router.post('/create', authMiddleware, createRendezVous);
router.get('/:id/approved', authMiddleware, getRendezVousDoctor);

module.exports = router;
