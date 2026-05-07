export type ProductType = {
	_id: string;
	name: string;
	brand: string;
	category: string;
	description: string;
	price: number;
	stock: number;
	isActive: boolean;
	rating: number;
	numReviews: number;
	images: string[];
	createdAt: string; // اگر خواستی می‌توانم تبدیلش کنم به Date
	updatedAt: string;
	__v: number;
};

// User who placed the order
export interface OrderUser {
	_id: string;
	name: string;
	email: string;
}

// Address info stored inside the order
export interface ShippingAddress {
	name: string; // دریافت‌کننده
	phone: string; // شماره تماس
	address: string; // آدرس کامل
}

// Product inside order item
export interface OrderProduct {
	_id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	category: string;
	stock: number;
	brand: string;
	rating: number;
	numReviews: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

// Each item in orderItems array
export interface OrderItem {
	_id: string;
	name: string;
	quantity: number;
	price: number;
	image: string;
	product: OrderProduct;
}

// Full order structure
export interface Orders {
	_id: string;
	shippingAddress: ShippingAddress;
	user: OrderUser;
	orderItems: OrderItem[];
	paymentMethod: string;
	totalPrice: number;
	status: string;
	isPaid: boolean;
	createdAt: string;
	updatedAt: string;
	__v?: number;
}

// Response structure from backend
export interface OrdersResponse {
	success: boolean;
	count: number;
	total: number;
	page: number;
	pages: number;
	data: Orders[];
}
