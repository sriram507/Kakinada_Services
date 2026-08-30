const mongoose = require('mongoose');

const CATEGORIES = [
  'tailor',
  'advocate',
  'ca',
  'digital_marketing',
  'it_technical',
  'real_estate',
];

// Categories that use the paid "service team connects you" flow.
// advocate & ca use the "directory" flow instead (no paid connection gate).
const PAID_CONNECT_CATEGORIES = [
  'tailor',
  'digital_marketing',
  'it_technical',
  'real_estate',
];

const professionalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    businessName: { type: String, required: true, trim: true },
    specialization: { type: String, trim: true },
    experienceYears: { type: Number, default: 0 },
    description: { type: String, trim: true },
    listingType: {
      type: String,
      enum: ['paid_connect', 'directory'],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    // Only populated/shown publicly for listingType: 'directory' (advocate, ca)
    publicContact: {
      phone: { type: String },
      email: { type: String },
      officeAddress: { type: String },
    },
  },
  { timestamps: true }
);

// Keep listingType consistent with category automatically
professionalSchema.pre('validate', function () {
  this.listingType = PAID_CONNECT_CATEGORIES.includes(this.category)
    ? 'paid_connect'
    : 'directory';
});

module.exports = mongoose.model('Professional', professionalSchema);
module.exports.CATEGORIES = CATEGORIES;
module.exports.PAID_CONNECT_CATEGORIES = PAID_CONNECT_CATEGORIES;
