import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axiosInstance from "@/utils/interceptor/clientAxios";

export async function getProducts(page: number, limit: number, search: string) {
	try {
		const res = axiosInstance.get(
			`${BASE_URL}/api/products?page=${page}&limit=${limit}&search=${search}`,
		);
		const data = (await res).data;
		console.log(data);
		return data;
	} catch (error) {
		console.error("getProducts error:", error);
		throw error;
	}
}
