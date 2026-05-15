import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { ProductType } from "@/types/productTypeAndOrders";
type ProductCartType = {
	item: ProductType;
	type: string;
};

function ProductCard({ item, type }: ProductCartType) {
	return (
		<div className="bg-white border border-black/5 rounded-3xl p-4 lg:p-4 xl:p-5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-4 w-full min-h-90 lg:min-h-115">
			<div className="w-full flex justify-center">
				<img
					src={`${BASE_URL}${item.images?.[0]}`}
					alt={item.name}
					className="w-60 h-45 md:w-100 md:h-60 lg:w-full lg:h-60  xl:h-70 object-cover rounded-2xl bg-gray-100 p-3 shadow-sm"
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

			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 mt-auto">
				<div className="flex items-center gap-2 text-sm text-gray-500">
					<div className="w-2 h-2 rounded-full bg-green-500" />

					<span>موجود در انبار</span>
				</div>

				<button className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-700/20 w-full sm:w-fit text-sm">
					مشاهده جزئیات
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
