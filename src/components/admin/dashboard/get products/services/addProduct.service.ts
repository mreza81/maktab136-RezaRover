import { AddProductScheemaType } from "@/scheema/addProduct";
import { ProductTypeInAddProduct } from "@/types/productTypeInAddProduct";
import axiosInstance from "@/utils/interceptor/clientAxios";

export async function handleAddProduct(data: FormData) {
	try {
		const res = await axiosInstance.post("/api/products", data);
		const resData = res.data;

		return resData;
	} catch (error: any) {
		throw new Error(error.response.data.message); // پیام خطای بک‌اند
	}
}
