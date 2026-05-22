"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const segmentTitles: Record<string, string> = {
	products: "محصولات",
};

const filterLabels: Record<string, string> = {
	category: "کلاس بدنه",
	brand: "برند",
};

export default function Breadcrumb() {
	const pathname = usePathname() || "/";
	const searchParams = useSearchParams();

	const segments = pathname.split("/").filter(Boolean);

	// حذف page و limit از فیلترها
	const filterEntries = Array.from(searchParams.entries()).filter(
		([key]) => key !== "page" && key !== "limit",
	);

	return (
		<div className="flex flex-wrap gap-1 text-sm md:text-md lg:text-lg mt-5 text-gray-500">
			{/* لینک خانه */}
			<Link href="/">خانه</Link>

			{/* نمایش مسیرها */}
			{segments.map((segment, index) => {
				const isLast = index === segments.length - 1;
				const prevSegment = segments[index - 1];
				const href = "/" + segments.slice(0, index + 1).join("/");

				// اگر مسیر آخر مربوط به شناسهٔ محصول (id) باشد
				const isProductId = prevSegment === "products" && isLast;

				// متن برای نمایش
				const label = isProductId
					? "جزئیات محصول"
					: (segmentTitles[segment] ?? segment);

				return (
					<span key={href} className="flex items-center gap-1">
						<span>/</span>
						{isProductId ? (
							<span className="text-gray-700">{label}</span>
						) : (
							<Link href={href} className="hover:text-gray-800">
								{label}
							</Link>
						)}
					</span>
				);
			})}

			{/* فیلترها (قابل کلیک، با حذف سایر فیلترها) */}
			{filterEntries.map(([key, value]) => {
				const title = filterLabels[key] ?? key;
				const values = value.split(",");

				return values.map((v, i) => {
					// ساخت یک query فقط با همین فیلتر
					const newParams = new URLSearchParams();
					newParams.set(key, v);

					const linkHref = pathname + "?" + newParams.toString();

					return (
						<span key={key + v + i} className="flex items-center gap-1">
							<span>/</span>
							<Link href={linkHref} className="hover:text-gray-800">
								{v}
							</Link>
						</span>
					);
				});
			})}
		</div>
	);
}
