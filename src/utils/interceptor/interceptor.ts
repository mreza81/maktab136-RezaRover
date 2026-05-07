import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

const AUTH_URLS = ["/api/auth/login", "/api/auth/refresh"];

// ---------------- REQUEST INTERCEPTOR ----------------

axiosInstance.interceptors.request.use(
	(config) => {
		const token = Cookies.get("access-token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// ---------------- RESPONSE INTERCEPTOR ----------------

axiosInstance.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config as any;

		// اگر سرور پاسخ نداد (مشکل اینترنت یا سرور)
		if (!error.response) {
			return Promise.reject(error);
		}

		const status = error.response.status;

		// ---------------- 401 ----------------
		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = Cookies.get("refresh-token");

				const res = await axios.post(`${BASE_URL}/api/auth/refresh`, {
					refreshToken,
				});

				const newAccessToken = res.data.data.token;

				Cookies.set("access-token", newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return axiosInstance(originalRequest);
			} catch (err) {
				Cookies.remove("access-token");
				Cookies.remove("refresh-token");
				const currentPath = window.location.pathname;
				if (currentPath.startsWith("/admin")) {
					window.location.href = "/admin/MhdDgh1381/login";
				} else {
					window.location.href = "/login";
				}

				return Promise.reject(err);
			}
		}

		// // // ---------------- 400 ----------------
		// // if (status === 400) {
		// // 	toast.error(error.response.data.message || "درخواست نامعتبر است");
		// // }

		// // ---------------- 403 ----------------
		// if (status === 403) {
		// 	toast.error("شما دسترسی لازم را ندارید");
		// }

		// // ---------------- 404 ----------------
		// if (status === 404) {
		// 	toast.error("منبع مورد نظر پیدا نشد");
		// }

		// // ---------------- 500 ----------------
		// if (status === 500) {
		// 	toast.error("خطای سرور رخ داده است");
		// }

		// return Promise.reject(error);
	},
);

export default axiosInstance;
