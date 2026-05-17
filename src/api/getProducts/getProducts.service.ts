import axiosInstance from "@/utils/interceptor/interceptor";
import axios from "axios";
import { BASE_URL } from "../BASE-URL/BASE-URL";

export async function getProducts(
	brand: string,
	search: string,
	category: string,
	page: number,
	limit: number,
) {
	try {
		const res = await axios.get(
			`${BASE_URL}/api/products?brand=${brand}&page=${page}&limit=${limit}&category=${category}&search=${search}`,
		);
		const data = res.data;

		return data;
	} catch (error) {
		throw error;
	}
}
