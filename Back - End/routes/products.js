const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		const category = req.query.category;
		const search = req.query.search;
		const brand = req.query.brand;
		const age = req.query.age;

		// Build query
		let query = { isActive: true };
		if (category) {
			query.category = category;
		}
		if (brand) {
			query.brand = { $in: brand.split(",") };
		}

		if (age) {
			query.age = age;
		}

		if (search) {
			query.$or = [
				{ name: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
			];
		}

		const products = await Product.find(query)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Product.countDocuments(query);

		res.json({
			success: true,
			count: products.length,
			total,
			page,
			pages: Math.ceil(total / limit),
			data: products,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "خطا در دریافت محصولات",
			error: error.message,
		});
	}
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "محصول یافت نشد",
			});
		}

		res.json({
			success: true,
			data: product,
		});
	} catch (error) {
		if (error.name === "CastError") {
			return res.status(404).json({
				success: false,
				message: "محصول یافت نشد",
			});
		}

		res.status(500).json({
			success: false,
			message: "خطا در دریافت محصول",
			error: error.message,
		});
	}
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
router.post(
	"/",
	protect,
	admin,
	upload.array("images", 10),
	[
		body("name").notEmpty().withMessage("نام محصول الزامی است"),
		body("description").notEmpty().withMessage("توضیحات الزامی است"),
		body("price").isNumeric().withMessage("قیمت باید عدد باشد"),
		body("category").notEmpty().withMessage("دسته‌بندی الزامی است"),
		body("stock")
			.isInt({ min: 0 })
			.withMessage("موجودی باید عدد صحیح غیرمنفی باشد"),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					success: false,
					errors: errors.array(),
				});
			}

			if (!req.files || req.files.length === 0) {
				return res.status(400).json({
					success: false,
					message: "حداقل یک عکس الزامی است",
				});
			}

			const images = req.files.map(
				(file) => `/uploads/products/${file.filename}`,
			);

			const product = await Product.create({
				...req.body,
				images,
				price: parseFloat(req.body.price),
				stock: parseInt(req.body.stock),
			});

			res.status(201).json({
				success: true,
				message: "محصول با موفقیت ایجاد شد",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "خطا در ایجاد محصول",
				error: error.message,
			});
		}
	},
);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put(
	"/:id",
	protect,
	admin,
	upload.array("images", 10),
	async (req, res) => {
		try {
			let product = await Product.findById(req.params.id);

			if (!product) {
				return res.status(404).json({
					success: false,
					message: "محصول یافت نشد",
				});
			}

			// Handle new images if uploaded
			if (req.files && req.files.length > 0) {
				const newImages = req.files.map(
					(file) => `/uploads/products/${file.filename}`,
				);
				req.body.images = [...product.images, ...newImages];
			}

			// Convert price and stock to numbers if provided
			if (req.body.price) req.body.price = parseFloat(req.body.price);
			if (req.body.stock) req.body.stock = parseInt(req.body.stock);

			product = await Product.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});

			res.json({
				success: true,
				message: "محصول با موفقیت بروزرسانی شد",
				data: product,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "خطا در بروزرسانی محصول",
				error: error.message,
			});
		}
	},
);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "محصول یافت نشد",
			});
		}

		// Delete images from filesystem
		product.images.forEach((image) => {
			const imagePath = image.replace("/uploads/", "uploads/");
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		});

		await product.deleteOne();

		res.json({
			success: true,
			message: "محصول با موفقیت حذف شد",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "خطا در حذف محصول",
			error: error.message,
		});
	}
});

module.exports = router;
