const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "نام محصول الزامی است"],
			trim: true,
		},
		description: {
			type: String,
			required: [true, "توضیحات محصول الزامی است"],
		},
		price: {
			type: Number,
			required: [true, "قیمت محصول الزامی است"],
			min: [0, "قیمت نمی‌تواند منفی باشد"],
		},
		images: {
			type: [String],
			required: [true, "حداقل یک عکس الزامی است"],
			validate: {
				validator: function (v) {
					return v && v.length > 0;
				},
				message: "حداقل یک عکس الزامی است",
			},
		},
		category: {
			type: String,
			required: [true, "دسته‌بندی الزامی است"],
			trim: true,
		},
		stock: {
			type: Number,
			required: [true, "موجودی الزامی است"],
			min: [0, "موجودی نمی‌تواند منفی باشد"],
			default: 0,
		},
		brand: {
			type: String,
			trim: true,
		},
		age: {
			type: String,
			enum: ["0-1", "1-3", "3-5", "5-8", "8-12", "12-18"],
			trim: true,
		},
		rating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		numReviews: {
			type: Number,
			default: 0,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Product", productSchema);
