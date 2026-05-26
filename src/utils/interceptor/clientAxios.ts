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
		// اضافه کردن شرط برای جلوگیری از خطا در سرور
		if (typeof window !== "undefined") {
			const token = Cookies.get("access-token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
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

		if (!error.response) {
			return Promise.reject(error);
		}

		const status = error.response.status;

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// اینجا هم باید چک شود که فقط در مرورگر اجرا شود
			if (typeof window !== "undefined") {
				try {
					const refreshToken = Cookies.get("refresh-token");

					const res = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
						refreshToken,
					});

					const newAccessToken = res.data.data.token;

					Cookies.set("access-token", newAccessToken);

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

					return axiosInstance(originalRequest);
				} catch (err) {
					Cookies.remove("access-token");
					Cookies.remove("refresh-token");

					// مدیریت window.location
					const currentPath = window.location.pathname;
					if (currentPath.startsWith("/admin")) {
						window.location.href = "/admin/MhdDgh1381/login";
					} else {
						window.location.href = "/login";
					}

					return Promise.reject(err);
				}
			}
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
