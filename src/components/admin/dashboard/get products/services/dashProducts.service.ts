import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axiosInstance from "@/utils/interceptor/interceptor";

export async function getProducts(
	page: number,
	limit: number,
	debouncedSearch: string,
) {
	try {
		const res = axiosInstance.get(
			`${BASE_URL}/api/products?page=${page}&limit=${limit}&search=${debouncedSearch}`,
		);
		const data = (await res).data;

		return data;
	} catch (error) {
		console.error("getProducts error:", error);
		throw error;
	}
}
