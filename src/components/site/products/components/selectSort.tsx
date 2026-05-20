"use client";
import { useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

export default function SortSelect() {
	const [sort, setSort] = useState("");

	return (
		<div className="relative w-75 hidden lg:block">
			<div className="relative">
				{/* آیکن مرتب سازی */}
				<ArrowUpDown
					size={18}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
				/>

				<select
					value={sort}
					onChange={(e) => setSort(e.target.value)}
					className="
            appearance-none
            w-full
            bg-white
            border border-gray-300
            text-gray-700
            text-sm
            rounded-xl
            py-2.5
            pr-10
            pl-10
            shadow-sm
            transition
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-[#7c00a0]
            focus:border-[#7c00a0]
            hover:border-[#7c00a0]
            cursor-pointer
          "
				>
					<option value="" disabled>
						مرتب سازی
					</option>
					<option value="newest">جدیدترین</option>
					<option value="available">کالاهای موجود</option>
					<option value="expensive">گران‌ترین</option>
					<option value="cheap">ارزان‌ترین</option>
				</select>

				{/* فلش باز شدن */}
				<ChevronDown
					size={18}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
				/>
			</div>
		</div>
	);
}
