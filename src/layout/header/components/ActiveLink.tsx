"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={`${isActive ? "text-primary font-bold" : "text-white"} hover:text-primary  hidden lg:block xl:block`}
		>
			{children}
		</Link>
	);
}
