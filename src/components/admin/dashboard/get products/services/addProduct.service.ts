import { AddProductScheemaType } from "@/scheema/addProduct";
import { ProductTypeInAddProduct } from "@/types/productTypeInAddProduct";
import axiosInstance from "@/utils/interceptor/interceptor";

export async function handleAddProduct(data: AddProductScheemaType) {
	try {
		const res = await axiosInstance.post("/api/products");
		const data = res.data;
		console.log(data);
		return data;
	} catch (error: any) {
		throw new Error(error.response.data.message); // پیام خطای بک‌اند
	}
}
