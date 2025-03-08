const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createRendezVous } = require('../controllers/rendezVousController');

router.post('/create', authMiddleware, createRendezVous);

module.exports = router;
