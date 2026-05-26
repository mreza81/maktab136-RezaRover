import axiosInstance from "@/utils/interceptor/clientAxios";

export async function deletFromCart(id: string) {
	try {
		const res = await axiosInstance.delete(`/api/cart/remove/${id}`);
		return res;
	} catch (error: any) {
		throw error.response?.data || error.message;
	}
}
