import axiosInstance from "@/utils/interceptor/clientAxios";

export async function updateOrderStatus(id: string, status: any) {
	try {
		const res = await axiosInstance.put(`/api/orders/${id}/status`, status);
		return res;
	} catch (error: any) {
		throw error.response?.data || error.message;
	}
}
