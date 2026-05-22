import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { User } from "@/types/adminLoginType";
import axiosInstance from "@/utils/interceptor/interceptor";
import axios from "axios";

import Cookies from "js-cookie";

export async function handleAdminLogin(user: User) {
	try {
		const res = await axios.post(`${BASE_URL}/api/auth/login`, user);

		const data = res.data;

		Cookies.set("access-token", data.data.token, {
			expires: 1,
		});
		Cookies.set("refresh-token", data.data.refreshToken, {
			expires: 7,
		});
		Cookies.set("role", data.data.user.role, {
			expires: 7,
		});
		return res.data;
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.message); // پیام خطای بک‌اند
		} else {
			throw new Error("مشکل در ارتباط با سرور");
		}
	}
}
