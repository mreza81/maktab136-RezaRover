import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwt(token: string) {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join(""),
		);

		return JSON.parse(jsonPayload);
	} catch {
		return null;
	}
}

export function middleware(req: NextRequest) {
	const token = req.cookies.get("admin-access-token")?.value;
	const { pathname } = req.nextUrl;

	if (pathname === "/admin/MhdDgh1381/login") {
		if (token) {
			const decoded = decodeJwt(token);

			if (!decoded || decoded.role !== "admin") {
				return NextResponse.rewrite(new URL("/404", req.url));
			}

			return NextResponse.redirect(new URL("/admin", req.url));
		}

		return NextResponse.next();
	}

	if (pathname.startsWith("/admin")) {
		if (!token) {
			const loginUrl = new URL("/admin/MhdDgh1381/login", req.url);
			return NextResponse.redirect(loginUrl);
		}

		const decoded = decodeJwt(token);

		if (!decoded || decoded.role !== "admin") {
			return NextResponse.rewrite(new URL("/404", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
