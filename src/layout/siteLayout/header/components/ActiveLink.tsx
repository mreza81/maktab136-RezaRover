"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function ActiveLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const isActive = pathname === href;
	const isHomeOrAdmin = pathname === "/" || pathname.startsWith("/admin");

	const linkClass = clsx(" transition-colors duration-200 ", {
		// اگر فعال است و در home یا admin هستیم
		"text-secondry hover:text-secondry font-bold": isActive && isHomeOrAdmin,
		// اگر فعال است ولی در صفحه معمولی
		"text-tertialy hover:text-tertialy font-bold": isActive && !isHomeOrAdmin,
		// حالت غیر فعال
		"text-white": !isActive,
	});

	return (
		<Link href={href} className={linkClass}>
			{children}
		</Link>
	);
}
