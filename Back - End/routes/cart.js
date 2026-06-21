const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت سبد خرید',
      error: error.message
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', protect, [
  body('productId').notEmpty().withMessage('شناسه محصول الزامی است'),
  body('quantity').isInt({ min: 1 }).withMessage('تعداد باید عدد صحیح مثبت باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'محصول یافت نشد'
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `موجودی کافی نیست. موجودی: ${product.stock}`
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[itemIndex].quantity + quantity;
      
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `موجودی کافی نیست. موجودی: ${product.stock}`
        });
      }

      cart.items[itemIndex].quantity = newQuantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'محصول به سبد خرید اضافه شد',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در افزودن به سبد خرید',
      error: error.message
    });
  }
});

// @route   PUT /api/cart/update/:itemId
// @desc    Update cart item quantity
// @access  Private
router.put('/update/:itemId', protect, [
  body('quantity').isInt({ min: 1 }).withMessage('تعداد باید عدد صحیح مثبت باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'سبد خرید یافت نشد'
      });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'آیتم یافت نشد'
      });
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `موجودی کافی نیست. موجودی: ${product.stock}`
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'سبد خرید بروزرسانی شد',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بروزرسانی سبد خرید',
      error: error.message
    });
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:itemId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'سبد خرید یافت نشد'
      });
    }

    cart.items.pull(req.params.itemId);
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'آیتم از سبد خرید حذف شد',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در حذف از سبد خرید',
      error: error.message
    });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'سبد خرید یافت نشد'
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'سبد خرید خالی شد',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در خالی کردن سبد خرید',
      error: error.message
    });
  }
});

module.exports = router;

