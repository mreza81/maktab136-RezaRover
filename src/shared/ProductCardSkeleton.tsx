function ProductCardSkeleton({ type }: { type?: string }) {
	const isSwiper = type === "swiper";

	return (
		<div
			className={`bg-white border border-black/5 rounded-3xl shadow-sm flex flex-col gap-4 animate-pulse 
      ${isSwiper ? "min-h-90 lg:min-h-115 w-full p-4 lg:p-5" : "lg:min-h-70 w-full px-4 py-2"}`}
		>
			{/* بخش تصویر */}
			<div className="w-full flex justify-center">
				<div className="w-full h-60 xl:h-80 bg-gray-200 rounded-2xl"></div>
			</div>

			{/* بخش متن‌ها */}
			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
					<div className="h-4 w-20 bg-gray-200 rounded"></div>
					<div className="h-4 w-32 bg-gray-200 rounded"></div>
				</div>

				<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
					<div className="h-4 w-16 bg-gray-200 rounded"></div>
					<div className="h-4 w-24 bg-gray-200 rounded"></div>
				</div>

				<div className="flex justify-between items-center gap-3">
					<div className="h-4 w-12 bg-gray-200 rounded"></div>
					<div className="h-6 w-28 bg-gray-200 rounded"></div>
				</div>
			</div>

			{/* بخش دکمه و موجودی */}
			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 mt-auto">
				<div className="h-4 w-32 bg-gray-200 rounded"></div>
				<div className="h-10 w-full sm:w-28 bg-gray-200 rounded-xl"></div>
			</div>
		</div>
	);
}

export default ProductCardSkeleton;
