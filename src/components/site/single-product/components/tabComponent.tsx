"use client";
import { useState } from "react";

export default function ProductTabs({ product }: { product: any }) {
	const [tab, setTab] = useState<"desc" | "comments">("desc");

	return (
		<div className="w-full rounded-xl bg-[#F5F3FF] p-6 shadow-sm border border-purple-200 h-full flex flex-col">
			{/* تب‌ها */}
			<div className="flex gap-4 mb-5 border-b border-purple-200 pb-3">
				<button
					onClick={() => setTab("desc")}
					className={`px-4 py-2 rounded-lg font-semibold transition ${
						tab === "desc"
							? "bg-purple-600 text-white shadow"
							: "text-gray-700 hover:bg-purple-100"
					}`}
				>
					توضیحات محصول
				</button>

				<button
					onClick={() => setTab("comments")}
					className={`px-4 py-2 rounded-lg font-semibold transition ${
						tab === "comments"
							? "bg-purple-600 text-white shadow"
							: "text-gray-700 hover:bg-purple-100"
					}`}
				>
					نظرات کاربران
				</button>
			</div>

			{/* محتوا = max-height + scroll */}
			<div className="text-gray-800 leading-7 max-h-95 overflow-y-auto pr-2 vertical-scroll-rtl">
				{tab === "desc" ? (
					<p>{product?.description}</p>
				) : (
					<p>هنوز نظری ثبت نشده.</p>
				)}
			</div>
		</div>
	);
}
