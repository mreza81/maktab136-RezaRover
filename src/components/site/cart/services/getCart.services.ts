import axiosServer from "@/utils/interceptor/serverAxios";

export async function getCart() {
	try {
		const res = await axiosServer("/api/cart");
		const data = res.data;

		return data.data;
	} catch (error: any) {
		throw new Error(error);
	}
}
