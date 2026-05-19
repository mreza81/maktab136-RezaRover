import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("access-token")?.value;
	const role = req.cookies.get("role")?.value;
	const { pathname } = req.nextUrl;

	if (pathname.startsWith("/admin") && pathname.endsWith("/login")) {
		if (token && role == "admin") {
			const dashboardPath = new URL("/admin/MhdDgh1381/dashboard", req.url);

			return NextResponse.redirect(dashboardPath);
		}
	}

	// محافظت از مسیرهای ادمین به جز صفحه لاگین
	if (pathname.startsWith("/admin") && !pathname.endsWith("/login")) {
		if (!token) {
			const loginUrl = new URL("/admin/MhdDgh1381/login", req.url);
			return NextResponse.redirect(loginUrl);
		}
		if (role !== "admin") {
			return new NextResponse("Not Found", { status: 404 });
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
