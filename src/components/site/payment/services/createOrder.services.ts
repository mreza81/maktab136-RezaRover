import axiosInstance from "@/utils/interceptor/clientAxios";

export async function createOrder(data: any) {
	try {
		const res = await axiosInstance.post("/api/orders", data);
		console.log(res);
		return res;
	} catch (error: any) {
		throw error.response?.data || error.message;
	}
}
