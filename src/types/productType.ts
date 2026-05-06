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
