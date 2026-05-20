"use client";

export default function FilterAndSortDivMobile() {
	return (
		<div className="w-full px-5 mt-5 flex flex-col gap-4 lg:hidden ">
			{/* دکمه‌ها */}
			<div className="flex justify-between items-center">
				{/* فیلتر */}
				<button className="flex items-center gap-2 p-2 px-4  border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white border-gray-200 hover:bg-gray-50">
					<img
						src="/assets/images/filter.svg"
						alt="فیلتر"
						className="w-5 h-5 md:w-7 md:h-7"
					/>
					<span className="text-sm md:text-md text-gray-700 font-medium">
						فیلتر
					</span>
				</button>

				{/* مرتب‌سازی */}
				<button className="flex items-center gap-2 p-2 px-4 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white border-gray-200 hover:bg-gray-50">
					<img
						src="/assets/images/filter-alt.svg"
						alt="مرتب سازی"
						className="w-5 h-5 md:w-7 md:h-7"
					/>
					<span className="text-sm md:text-md text-gray-700 font-medium">
						مرتب‌سازی
					</span>
				</button>
			</div>

			{/* خط جداکننده زیر دکمه‌ها */}
			<div className="border-b-2 border-gray-200 mt-5 "></div>
		</div>
	);
}
