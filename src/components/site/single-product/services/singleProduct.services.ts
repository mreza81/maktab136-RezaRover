import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axios from "axios";

export async function singleProductService(id: string) {
	try {
		const res = await axios.get(`${BASE_URL}/api/products/${id}`);
		return res.data;
	} catch (error: any) {
		throw new Error(error);
	}
}
