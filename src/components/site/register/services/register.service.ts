import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { RegisterType } from "@/scheema/register";
import axios from "axios";
import Cookies from "js-cookie";

export async function registerService(user: RegisterType) {
	try {
		const res = await axios.post(`${BASE_URL}/api/auth/register`, user);
		console.log(res.data);
		const data = res.data;
		Cookies.set("access-token", data.data.token, {
			expires: 1,
		});
		Cookies.set("refresh-token", data.data.user.refreshToken, {
			expires: 7,
		});
		Cookies.set("role", "user", {
			expires: 7,
		});
		return res.data;
	} catch (error: any) {
		throw new Error(error);
	}
}
