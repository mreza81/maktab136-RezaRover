import axiosInstance from "@/utils/interceptor/clientAxios";

export async function getCartItems() {
	const res = await axiosInstance("/api/cart");
	const data = await res.data;
	return data;
}
