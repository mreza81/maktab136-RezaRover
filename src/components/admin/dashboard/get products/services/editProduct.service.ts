import axiosInstance from "@/utils/interceptor/clientAxios";

export async function editProduct(data: FormData, productId: string) {
	try {
		const res = await axiosInstance.put(`/api/products/${productId}`, data);
		const responceData = res.data;
		return responceData;
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.message); // پیام خطای بک‌اند
		} else {
			throw new Error("مشکل در ارتباط با سرور");
		}
	}
}
