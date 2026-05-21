"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
};

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("limit", e.target.value);
		params.set("page", "1");
		router.push(`?${params.toString()}`);
	};

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`?${params.toString()}`);
	};

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
					defaultValue={searchParams.get("limit") || "30"}
					className="border-violet-200 border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-violet-500 transition"
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
