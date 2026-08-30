const mongoose = require('mongoose');
const { CATEGORIES } = require('./Professional');

const leadSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', default: null },
    status: {
      type: String,
      enum: ['pending_payment', 'paid', 'contacted', 'connected', 'closed'],
      default: 'pending_payment',
    },
    // Tailor-specific fields (ignored for other categories)
    slotDateTime: { type: Date },
    visitType: { type: String, enum: ['tailor_visits', 'customer_visits_shop'] },
    customerNote: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
