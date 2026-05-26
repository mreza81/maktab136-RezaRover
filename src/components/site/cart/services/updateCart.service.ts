import axiosInstance from "@/utils/interceptor/clientAxios";

export async function updateCart(id: string, quantity: number) {
	try {
		const res = await axiosInstance.put(`/api/cart/update/${id}`, {
			quantity,
		});
		return res.data.data;
	} catch (error: any) {
		throw error.response?.data || error.message;
	}
}
