"use client";
import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { ProductType } from "@/types/productTypeAndOrders";
import { useRouter, useSearchParams } from "next/navigation";
type ProductCartType = {
	item: ProductType;
	type: string;
};

function ProductCard({ item, type }: ProductCartType) {
	const isSwiper = type === "swiper";
	const lowItemStock = item.stock < 6;
	const isOutStock = item.stock == 0;
	const router = useRouter();
	const searchParams = useSearchParams();
	//هندل کردن به صفحه تک محصول
	const handleGoToProductDetail = (value: string) => {
		router.push(`/products/${value}`);
	};
	return (
		<div
			className={` bg-white border border-black/5 rounded-3xl   shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-4 
				${isSwiper ? "min-h-90 lg:min-h-115 w-full p-4 lg:p-5 " : "lg:min-h-70 w-full  px-4 py-2 "}`}
		>
			<div className="group w-full flex justify-center">
				<img
					src={`${BASE_URL}${item.images?.[0]}`}
					alt={item.name}
					className="w-60 h-45 md:w-100 md:h-60 lg:w-full lg:h-60  xl:h-80 object-cover rounded-2xl bg-gray-100 p-3 shadow-sm transition-transform duration-500 ease-in-out group-hover:scale-105 hover:cursor-pointer"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
					<span className="text-gray-500 text-sm">مدل خودرو</span>

					<span className="font-black text-black text-sm lg:text-base text-left">
						{item.name}
					</span>
				</div>

				<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
					<span className="text-gray-500 text-sm">دسته‌بندی</span>

					<span className="font-semibold text-black text-sm">
						{item.category}
					</span>
				</div>

				<div className="flex justify-between items-center gap-3">
					<span className="text-gray-500 text-sm">قیمت</span>

					<span className="font-black text-violet-700 text-base lg:text-xl">
						{item.price.toLocaleString("fa-ir")}$
					</span>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 mt-auto ">
				<div className="flex items-center gap-2 text-sm text-gray-500  ">
					<div
						className={`w-2 h-2 rounded-full
						${isOutStock ? "bg-gray-400" : lowItemStock ? "bg-red-600" : " bg-green-500"}`}
					/>

					<span className="">
						{isOutStock
							? "اتمام موجودی"
							: lowItemStock
								? `تنها ${item.stock} عدد باقی مانده است`
								: `موجود در انبار`}
					</span>
				</div>

				<button
					className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-700/20 w-full sm:w-fit text-sm hover:cursor-pointer truncate"
					onClick={() => handleGoToProductDetail(`${item._id}`)}
				>
					مشاهده جزئیات
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
