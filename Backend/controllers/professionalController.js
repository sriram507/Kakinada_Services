const Professional = require('../models/Professional');

// GET /api/professionals?category=tailor
// Public - used for both category browsing and the advocate/CA directory view
async function listProfessionals(req, res) {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const professionals = await Professional.find(filter)
      .populate('userId', 'name phone location')
      .sort({ createdAt: -1 });

    res.json(professionals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch professionals', error: err.message });
  }
}

// GET /api/professionals/:id
async function getProfessional(req, res) {
  try {
    const professional = await Professional.findById(req.params.id).populate(
      'userId',
      'name phone location'
    );
    if (!professional) return res.status(404).json({ message: 'Not found' });
    res.json(professional);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch professional', error: err.message });
  }
}

// POST /api/professionals  (requires auth, role: professional)
// The logged-in professional creates their own listing profile
async function createProfessional(req, res) {
  try {
    const { category, businessName, specialization, experienceYears, description, publicContact } =
      req.body;

    if (!category || !businessName) {
      return res.status(400).json({ message: 'category and businessName are required' });
    }

    const professional = await Professional.create({
      userId: req.user.id,
      category,
      businessName,
      specialization,
      experienceYears,
      description,
      publicContact, // only meaningful for advocate/ca, harmless otherwise
    });

    res.status(201).json(professional);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create listing', error: err.message });
  }
}

module.exports = { listProfessionals, getProfessional, createProfessional };
