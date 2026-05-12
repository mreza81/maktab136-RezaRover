import axiosInstance from "@/utils/interceptor/interceptor";

export async function getProducts(
	brand: string,
	search: string,
	category: string,
	page: number,
	limit: number,
) {
	try {
		const res = await axiosInstance.get(
			`/api/products?brand=${brand}&page=${page}&limit=${limit}&category=${category}&search=${search}`,
		);
		const data = res.data;
		console.log(data.data);
		return data;
	} catch (error) {
		throw error;
	}
}
