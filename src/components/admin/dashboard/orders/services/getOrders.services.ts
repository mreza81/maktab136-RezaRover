import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axiosInstance from "@/utils/interceptor/clientAxios";

export async function getOrders(page: number, limit: number, status: string) {
	try {
		const res = axiosInstance.get(
			`${BASE_URL}/api/orders/admin/all?page=${page}&limit=${limit}&status=${status}`,
		);
		const data = (await res).data;
		console.log(data.data);

		return data;
	} catch (e: any) {
		if (e.response && e.response.data) {
			return Promise.reject(e.response.data);
		}

		return Promise.reject({ message: e.message || "Unknown error" });
	}
}
