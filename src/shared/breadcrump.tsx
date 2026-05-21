"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// ترجمه‌ی segment‌ها
const segmentTitles: Record<string, string> = {
	products: "محصولات",
};

// ترجمه کلیدهای فیلتر
const filterLabels: Record<string, string> = {
	category: "کلاس بدنه",
	brand: "برند",
};

export default function Breadcrumb() {
	const pathname = usePathname() || "/";
	const searchParams = useSearchParams();

	const segments = pathname.split("/").filter(Boolean);

	// گرفتن فیلترهای فعال
	const filterEntries = Array.from(searchParams.entries()).filter(
		([key]) => key !== "page" && key !== "limit",
	);

	return (
		<div className="flex flex-wrap gap-1 text-sm md:text-md lg:text-lg mt-5 text-gray-500">
			{/* خانه */}
			<Link href="/">خانه</Link>

			{/* مسیرهای اصلی */}
			{segments.map((segment, index) => {
				const href = "/" + segments.slice(0, index + 1).join("/");
				const label = segmentTitles[segment] ?? segment;

				return (
					<span key={href} className="flex items-center gap-1">
						<span>/</span>
						<Link href={href} className="hover:text-gray-800 ">
							{label}
						</Link>
					</span>
				);
			})}

			{/* فیلترها */}
			{filterEntries.map(([key, value]) => {
				const title = filterLabels[key] ?? key;

				// اگر چند مقدار داشت → split
				const values = value.split(",");

				return values.map((v, i) => (
					<span key={key + v + i} className="flex items-center gap-1">
						<span>/</span>
						{/* هر فیلتر لینک ندارد – فقط متن */}
						<span className="text-gray-700">{v}</span>
					</span>
				));
			})}
		</div>
	);
}
