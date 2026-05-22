"use client";

import { useRouter } from "next/navigation";
import { SearchX, RotateCcw } from "lucide-react";

const NoResults = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 md:mx-auto">
			{/* آیکون اصلی */}
			<SearchX className="w-16 h-16 text-gray-400 mb-4" />

			<h2 className="text-2xl font-bold text-gray-700">
				خودرویی با این مشخصات پیدا نشد
			</h2>

			<p className="text-gray-500 mt-2 max-w-sm">
				فیلترهای انتخابی شما نتیجه‌ای نداشت. می‌توانید فیلترها را تغییر دهید یا
				همه را پاک کنید تا همه‌ی خودروها نمایش داده شوند.
			</p>

			<button
				onClick={() => router.push("/products")}
				className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
			>
				<RotateCcw className="w-5 h-5" />
				حذف همه فیلترها
			</button>
		</div>
	);
};

export default NoResults;
