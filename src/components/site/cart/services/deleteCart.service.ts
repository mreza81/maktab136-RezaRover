import axiosInstance from "@/utils/interceptor/clientAxios";

export async function deletCart() {
	try {
		const res = await axiosInstance.delete("/api/cart/clear");
	} catch (error: any) {
		throw error.response?.data || error.message;
	}
}
