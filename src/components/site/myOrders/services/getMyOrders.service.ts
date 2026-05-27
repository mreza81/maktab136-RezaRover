import axiosServer from "@/utils/interceptor/serverAxios";

export async function getMyOrders() {
	try {
		const res = await axiosServer("/api/orders");
		return res.data;
	} catch (error: any) {
		throw new Error(error);
	}
}
