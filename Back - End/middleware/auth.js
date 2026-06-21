const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'دسترسی غیرمجاز - توکن ارائه نشده است'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'کاربری با این توکن یافت نشد'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'توکن نامعتبر است'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در احراز هویت',
      error: error.message
    });
  }
};

// Check if user is admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'دسترسی محدود - فقط ادمین'
    });
  }
};

