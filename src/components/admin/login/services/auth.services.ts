import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { User } from "@/types/adminLoginType";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export async function handleAdminLogin(user: User) {
	try {
		const res = await axios.post(`${BASE_URL}/api/auth/login`, user);

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
