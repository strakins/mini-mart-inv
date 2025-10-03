const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const saleSchema = new mongoose.Schema({
  saleId: {
    type: String,
    unique: true
  },
  items: [saleItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  salesAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'transfer'],
    default: 'cash'
  }
}, {
  timestamps: true
});

saleSchema.pre('save', async function(next) {
  if (!this.saleId) {
    const count = await mongoose.model('Sale').countDocuments();
    this.saleId = `SALE-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Sale', saleSchema);