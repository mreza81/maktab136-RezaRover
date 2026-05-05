import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { User } from "@/types/adminLoginType";
import axiosInstance from "@/utils/interceptor/interceptor";

import Cookies from "js-cookie";

export async function handleAdminLogin(user: User) {
	try {
		const res = await axiosInstance.post(`${BASE_URL}/api/auth/login`, user);

		const data = res.data;

		Cookies.set("access-token", data.data.token);
		Cookies.set("refresh-token", data.data.refreshToken);
		return res.data;
	} catch (error: any) {
		if (error.response) {
			console.log(error.response.data.message); // پیام خطای بک‌اند
		} else {
			console.log("مشکل در ارتباط با سرور");
		}
	}
}
