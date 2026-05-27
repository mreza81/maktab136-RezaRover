import axiosInstance from "@/utils/interceptor/clientAxios";

export async function getCart() {
	try {
		const res = await axiosInstance("/api/cart");
		const data = res.data;
		return data.data;
	} catch (error: any) {
		throw new Error(error);
	}
}
