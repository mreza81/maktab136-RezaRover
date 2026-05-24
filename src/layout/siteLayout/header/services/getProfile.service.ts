import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axiosInstance from "@/utils/interceptor/interceptor";

export async function getProfileService() {
	try {
		const res = await axiosInstance.get(`${BASE_URL}/api/profile`);
		const data = res.data;
		return data;
	} catch (error: any) {
		throw new Error(error);
	}
}
