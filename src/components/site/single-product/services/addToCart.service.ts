import axiosInstance from "@/utils/interceptor/clientAxios";

export type Data = {
	productId: string;
	quantity: number;
};

export async function addToCart(data: Data) {
	try {
		const res = await axiosInstance.post("/api/cart/add", data);
		const resData = res.data;

		return resData;
	} catch (error: any) {
		console.log("Server Response Error:", error.response?.data);
		throw error;
	}
}
