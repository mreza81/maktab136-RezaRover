const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   POST /api/orders
// @desc    Create new order from cart
// @access  Private
router.post('/', protect, [
  body('shippingAddress.name').notEmpty().withMessage('نام گیرنده الزامی است'),
  body('shippingAddress.phone').notEmpty().withMessage('شماره تماس الزامی است'),
  body('shippingAddress.address').notEmpty().withMessage('آدرس الزامی است')
], async (req, res) => {
  // Validate first
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'خطا در اعتبارسنجی',
      errors: errors.array()
    });
  }

  try {
    // Get user's cart
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: 'سبد خرید یافت نشد'
      });
    }

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'سبد خرید خالی است'
      });
    }

    // Get all product IDs from cart
    const productIds = cart.items.map(item => {
      return item.product._id || item.product;
    });
    
    // Get all products in one query
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = {};
    products.forEach(p => {
      productMap[p._id.toString()] = p;
    });

    // Check stock and prepare order items
    const orderItems = [];
    const productsToUpdate = [];
    
    for (const item of cart.items) {
      const productId = (item.product._id || item.product).toString();
      const product = productMap[productId];
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `محصول با شناسه ${productId} یافت نشد`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `موجودی کافی نیست برای محصول ${product.name}. موجودی: ${product.stock}, درخواستی: ${item.quantity}`
        });
      }

      // Prepare order item
      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.price,
        image: product.images && product.images.length > 0 ? product.images[0] : ''
      });

      // Prepare product update (reduce stock)
      productsToUpdate.push({
        productId: product._id,
        newStock: product.stock - item.quantity
      });
    }

    // Update all products stock
    for (const update of productsToUpdate) {
      await Product.findByIdAndUpdate(
        update.productId,
        { stock: update.newStock },
        { new: true }
      );
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems: orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod || 'cash',
      status: 'pending',
      totalPrice: cart.totalPrice
    });

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    // Populate order for response
    const populatedOrder = await Order.findById(order._id)
      .populate('orderItems.product')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'سفارش با موفقیت ثبت شد',
      data: populatedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'خطا در ثبت سفارش',
      error: error.message,
      errorName: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت سفارش‌ها',
      error: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'سفارش یافت نشد'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'دسترسی غیرمجاز'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'سفارش یافت نشد'
      });
    }
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت سفارش',
      error: error.message
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin)
// @access  Private/Admin
router.put('/:id/status', protect, admin, [
  body('status').isIn(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'])
    .withMessage('وضعیت نامعتبر است')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { status } = req.body;
    const order = await Order.findById(req.params.id)
      .populate('orderItems.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'سفارش یافت نشد'
      });
    }

    const oldStatus = order.status;
    order.status = status;

    // If order is cancelled, restore stock
    if (status === 'cancelled' && oldStatus !== 'cancelled') {
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product._id || item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    // If order is delivered, set deliveredAt
    if (status === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    const updatedOrder = await Order.findById(order._id)
      .populate('orderItems.product')
      .populate('user', 'name email');

    res.json({
      success: true,
      message: 'وضعیت سفارش بروزرسانی شد',
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بروزرسانی وضعیت سفارش',
      error: error.message
    });
  }
});

// @route   GET /api/orders/admin/all
// @desc    Get all orders (Admin)
// @access  Private/Admin
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let query = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('orderItems.product')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت سفارش‌ها',
      error: error.message
    });
  }
});

module.exports = router;

