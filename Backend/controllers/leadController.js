const Lead = require('../models/Lead');
const { PAID_CONNECT_CATEGORIES } = require('../models/Professional');

// POST /api/leads  (requires auth, role: customer)
// Creates a new lead. For paid_connect categories this starts as pending_payment;
// advocate/ca don't use this flow at all (handled purely via the directory).
async function createLead(req, res) {
  try {
    const { category, slotDateTime, visitType, customerNote } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'category is required' });
    }
    if (!PAID_CONNECT_CATEGORIES.includes(category)) {
      return res.status(400).json({
        message: 'This category uses the directory model — contact the professional directly, no lead needed',
      });
    }

    const lead = await Lead.create({
      customerId: req.user.id,
      category,
      slotDateTime,
      visitType,
      customerNote,
      status: 'pending_payment',
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create lead', error: err.message });
  }
}

// GET /api/leads/my  (requires auth) - customer's own leads
async function getMyLeads(req, res) {
  try {
    const leads = await Lead.find({ customerId: req.user.id })
      .populate('professionalId', 'businessName category')
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads', error: err.message });
  }
}

// GET /api/leads  (requires auth, role: admin) - service team queue
async function getAllLeads(req, res) {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const leads = await Lead.find(filter)
      .populate('customerId', 'name phone email')
      .populate('professionalId', 'businessName category')
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leads', error: err.message });
  }
}

// PATCH /api/leads/:id  (requires auth, role: admin)
// Service team updates status and/or assigns a professional after contacting the customer
async function updateLead(req, res) {
  try {
    const { status, professionalId } = req.body;
    const update = {};
    if (status) update.status = status;
    if (professionalId) update.professionalId = professionalId;

    const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update lead', error: err.message });
  }
}

module.exports = { createLead, getMyLeads, getAllLeads, updateLead };
