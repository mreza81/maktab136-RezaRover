"use client";

import { Suspense, useState } from "react";
import FilterModal from "./filterModal";
import SortSelect from "./selectSort";

export default function FilterAndSortDivMobile() {
	const [openFilter, setOpenFilter] = useState(false);
	return (
		<div className="w-full px-5 mt-5 flex flex-col gap-4 lg:hidden ">
			{openFilter && (
				<Suspense fallback={null}>
					<FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter} />
				</Suspense>
			)}
			<div className="flex justify-between items-center">
				<button
					className="flex items-center gap-2 p-2 px-4  border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white border-gray-200 hover:bg-gray-50"
					onClick={() => setOpenFilter(true)}
				>
					<img
						src="/assets/images/filter.svg"
						alt="فیلتر"
						className="w-5 h-5 md:w-7 md:h-7"
					/>
					<span className="text-sm md:text-md text-gray-700 font-medium">
						فیلتر
					</span>
				</button>

				<select className="p-2 px-4 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white border-gray-200 hover:bg-gray-50 outline-none">
					<option value="newest">جدیدترین</option>
					<option value="available">کالاهای موجود</option>
					<option value="expensive">گران‌ترین</option>
					<option value="cheap">ارزان‌ترین</option>
				</select>
			</div>
			{/* خط جداکننده زیر دکمه‌ها */}
			<div className="border-b-2 border-gray-200 mt-5 "></div>
		</div>
	);
}
