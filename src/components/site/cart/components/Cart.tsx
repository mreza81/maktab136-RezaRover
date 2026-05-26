import { ChevronLeft, Info, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { getCart } from "../services/getCart.services";
import ProductInCart from "./ProductInCart";
import Stepper from "./Stepper";

async function Cart() {
	const res = async () => {
		const res = await getCart();
		return res;
	};

	const data = await res();
	const cartItems = data?.items || [];

	return (
		<div className="bg-gray-50">
			<div className="w-full h-20 lg:h-25 bg-secondry "></div>
			<Stepper />
			<div
				className="bg-gray-50 min-h-screen pb-7 px-4 md:px-12 font-[vazir,tahoma]"
				dir="rtl"
			>
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* بخش اصلی لیست محصولات */}
					<div className="lg:col-span-3 space-y-4">
						<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
							{/* Header - شامل دکمه حذف همه */}
							<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
								<div className="flex items-center gap-2">
									<ShoppingBag className="text-[#7c3aed]" size={22} />
									<div className="flex flex-col">
										<h2 className="text-lg font-bold text-gray-800">
											سبد خرید
										</h2>
										<span className="text-xs text-gray-400">
											{cartItems.length.toLocaleString("fa-IR")} محصول
										</span>
									</div>
								</div>

								{cartItems.length > 0 && (
									<button className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all text-sm font-medium">
										<Trash2 size={18} />
										<span>حذف همه</span>
									</button>
								)}
							</div>

							{/* Product Items */}
							{cartItems.length > 0 ? (
								cartItems.map((item: any) => (
									<ProductInCart item={item} key={item._id} />
								))
							) : (
								<div className="p-20 text-center text-gray-500 flex flex-col items-center gap-4">
									<ShoppingBag size={48} className="text-gray-200" />
									<p>سبد خرید شما در حال حاضر خالی است.</p>
								</div>
							)}
						</div>
					</div>

					{/* بخش فاکتور پرداخت (Sticky) */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6">
							<div className="space-y-5">
								<div className="flex justify-between text-gray-500 text-sm">
									<span>قیمت کالاها</span>
									<div className="flex gap-1 items-center">
										<span className="font-medium text-gray-800">
											{data.totalPrice.toLocaleString("fa-IR")}
										</span>
										<span className="text-[10px]">تومان</span>
									</div>
								</div>

								<div className="flex justify-between text-gray-500 text-sm">
									<span>هزینه گارانتی</span>
									<span className="text-[#7c3aed] font-bold">رایگان</span>
								</div>

								<div className="border-t border-dashed border-gray-200 pt-5 flex justify-between items-center">
									<span className="font-bold text-gray-700">جمع سبد خرید</span>
									<div className="text-left">
										<p className="text-xl font-black text-[#7c3aed]">
											{data.totalPrice.toLocaleString("fa-IR")}
										</p>
										<span className="text-[10px] text-gray-400">تومان</span>
									</div>
								</div>

								<button className="w-full bg-[#7c3aed] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6d28d9] transition-all transform active:scale-[0.98] shadow-lg shadow-purple-100 cursor-pointer">
									تایید و تکمیل سفارش
								</button>

								<div className="flex gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
									<Info size={20} className="text-[#7c3aed] shrink-0" />
									<p className="text-[11px] text-purple-900 leading-5">
										کالاهای موجود در سبد شما ثبت نشده‌اند؛ برای رزرو حتماً سفارش
										خود را نهایی کنید.
									</p>
								</div>

								{/* بخش باشگاه وفاداری اختصاصی */}
								<div className="relative overflow-hidden bg-gray-900 rounded-xl p-4 text-white group cursor-pointer">
									<div className="flex items-center justify-between relative z-10">
										<div className="flex items-center gap-2">
											<Sparkles size={18} className="text-purple-400" />
											<span className="text-xs font-bold">
												رضاروو پلاس شوید
											</span>
										</div>
										<ChevronLeft size={16} />
									</div>
									<div className="absolute -right-2 -top-2 w-12 h-12 bg-purple-600/20 rounded-full blur-xl group-hover:bg-purple-600/40 transition-all"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
