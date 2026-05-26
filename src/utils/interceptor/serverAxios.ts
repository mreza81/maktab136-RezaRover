import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
	baseURL: BASE_URL,
});

// ---------------- REQUEST INTERCEPTOR ----------------
axiosServer.interceptors.request.use(
	async (config) => { // اضافه کردن async اینجا
		const cookieStore = await cookies(); // اضافه کردن await برای نسخه های جدید Next.js
		const token = cookieStore.get("access-token")?.value;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// ---------------- RESPONSE INTERCEPTOR ----------------
axiosServer.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config;

		if (!error.response) {
			return Promise.reject(error);
		}

		const status = error.response.status;

		if (status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const cookieStore = await cookies(); // اضافه کردن await اینجا
				const refreshToken = cookieStore.get("refresh-token")?.value;

				if (!refreshToken) {
					throw new Error("No refresh token available");
				}

				const res = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
					refreshToken,
				});

				const newAccessToken = res.data.data.token;
				
				// توجه: ست کردن کوکی در اینترسپتور سمت سرور فقط زمانی کار میکند 
				// که این درخواست در یک Server Action یا Route Handler باشد.
				// cookieStore.set("access-token", newAccessToken); 

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosServer(originalRequest);
			} catch (err) {
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosServer;