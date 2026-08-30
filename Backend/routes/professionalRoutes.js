const express = require('express');
const router = express.Router();
const {
  listProfessionals,
  getProfessional,
  createProfessional,
} = require('../controllers/professionalController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/', listProfessionals); // public - browsing + directory view
router.get('/:id', getProfessional); // public
router.post('/', requireAuth, requireRole('professional'), createProfessional);

module.exports = router;
