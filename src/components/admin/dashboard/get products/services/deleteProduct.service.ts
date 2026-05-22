import axiosInstance from "@/utils/interceptor/interceptor";

export async function deleteProduct(productId: string) {
	try {
		const res = await axiosInstance.delete(`/api/products/${productId}`);
		const data = res.data;

		return data;
	} catch (error: any) {
		throw new Error(error.response.data.message); // پیام خطای بک‌اند
	}
}
