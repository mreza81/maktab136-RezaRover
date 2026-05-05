import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("access-token")?.value;
	const { pathname } = req.nextUrl;

	// محافظت از مسیرهای ادمین به جز صفحه لاگین
	if (pathname.startsWith("/admin") && !pathname.endsWith("/login")) {
		if (!token) {
			const loginUrl = new URL("/admin/MhdDgh1381/login", req.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
