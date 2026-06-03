"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react"; // useEffect و useState رو اضافه کردیم

type PaginationProps = {
	currentPage: number;
	totalPages: number;
};

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// State برای نگهداری مقدار فعلی select
	const [currentLimit, setCurrentLimit] = useState<string>(
		searchParams.get("limit") || "10",
	);

	// useEffect برای سینک کردن state با URL در ابتدای رندر یا بعد از تغییر URL
	useEffect(() => {
		const urlLimit = searchParams.get("limit") || "10";
		if (urlLimit !== currentLimit) {
			setCurrentLimit(urlLimit);
		}
	}, [searchParams, currentLimit]); // وابستگی‌ها برای اجرای صحیح

	// هندلر برای تغییر select
	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLimit = e.target.value;
		const params = new URLSearchParams(searchParams.toString());
		params.set("limit", newLimit);
		params.set("page", "1"); // وقتی limit عوض میشه، صفحه رو به اول برمی‌گردونیم
		router.push(`${pathname}?${params.toString()}`);
		setCurrentLimit(newLimit); // آپدیت state لوکال همزمان با تغییر URL
	};

	// هندلر برای رفتن به صفحه دلخواه
	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		// توجه: اینجا page رو تغییر میدیم، limit دست نمیخوره
		router.push(`${pathname}?${params.toString()}`);
	};

	// منطق تولید اعداد صفحه (مثل قبل)
	const getPageNumbers = () => {
		const delta = 1;
		const range: (number | string)[] = [];
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - delta && i <= currentPage + delta)
			) {
				range.push(i);
			} else if (range[range.length - 1] !== "...") {
				range.push("...");
			}
		}
		return range;
	};

	return (
		// در موبایل flex-col و در md به بالا flex-row
		<div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-violet-100">
			{/* بخش انتخاب تعداد */}
			<div className="flex items-center gap-3 text-sm text-gray-600">
				<span className="font-medium">نمایش در هر صفحه:</span>
				<select
					onChange={handleLimitChange}
					value={currentLimit} // از state لوکال استفاده می‌کنیم
					className="border-violet-200 border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-violet-500 transition disabled"
				>
					<option value="10">۱۰</option>
					<option value="30">۳۰</option>
					<option value="50">۵۰</option>
					<option value="100">۱۰۰</option>
				</select>
			</div>

			{/* بخش دکمه‌ها */}
			<div className="flex items-center gap-1" dir="ltr">
				<button
					onClick={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
					className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg disabled:opacity-30 transition"
				>
					<ChevronRight size={20} />
				</button>

				{getPageNumbers().map((page, index) => (
					<button
						key={index}
						// فقط اگر صفحه عدد بود، goToPage رو صدا بزن
						onClick={() => typeof page === "number" && goToPage(page)}
						className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
							page === currentPage
								? "bg-violet-600 text-white shadow-lg"
								: page === "..."
									? "cursor-default text-gray-400"
									: "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
						}`}
					>
						{page}
					</button>
				))}

				<button
					onClick={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg disabled:opacity-30 transition"
				>
					<ChevronLeft size={20} />
				</button>
			</div>
		</div>
	);
}
