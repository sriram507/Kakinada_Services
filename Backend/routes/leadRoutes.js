const express = require('express');
const router = express.Router();
const {
  createLead,
  getMyLeads,
  getAllLeads,
  updateLead,
} = require('../controllers/leadController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.post('/', requireAuth, requireRole('customer'), createLead);
router.get('/my', requireAuth, requireRole('customer'), getMyLeads);
router.get('/', requireAuth, requireRole('admin'), getAllLeads);
router.patch('/:id', requireAuth, requireRole('admin'), updateLead);

module.exports = router;
