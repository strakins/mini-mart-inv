const express = require('express');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Create sale
router.post('/', auth, async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    
    let totalAmount = 0;
    const saleItems = [];

    // Process each item
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}`
        });
      }

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      saleItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const sale = new Sale({
      items: saleItems,
      totalAmount,
      salesAgent: req.user._id,
      paymentMethod
    });

    await sale.save();
    await sale.populate('items.product');

    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get sales report
router.get('/report', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { startDate, endDate } = req.query;
    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sales = await Sale.find(filter)
      .populate('items.product')
      .populate('salesAgent', 'name email')
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;