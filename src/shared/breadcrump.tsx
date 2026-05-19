"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

// ترجمه‌ی segment‌ها
const segmentTitles: Record<string, string> = {
	products: "محصولات",
};

export default function Breadcrumb() {
	const pathname = usePathname() || "/";
	const segments = pathname.split("/").filter(Boolean);

	if (segments.length === 0) return <div className="text-sm mt-5">خانه</div>;

	return (
		<div className="flex gap-1 text-sm md:text-md lg:text-lg xl:text-xl mt-5 text-gray-500 ">
			<Link href="/">خانه</Link>

			{segments.map((segment, index) => {
				const href = "/" + segments.slice(0, index + 1).join("/");
				// اگر ترجمه ندارد، slug خودش را چاپ کند
				const label = segmentTitles[segment] ?? segment;

				return (
					<span key={href} className="flex items-center gap-1">
						<span>/</span>
						<Link href={href} className="hover:text-gray-800">
							{label}
						</Link>
					</span>
				);
			})}
		</div>
	);
}
