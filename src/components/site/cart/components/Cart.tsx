import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import {
	ChevronLeft,
	Info,
	Plus,
	ShieldCheck,
	ShoppingBag,
	Sparkles,
	Store,
	Trash2,
	Truck,
} from "lucide-react";
import { getCart } from "../services/getCart.services";
import Stepper from "./Stepper";

async function Cart() {
	const res = async () => {
		const res = await getCart();

		return res;
	};
	const data = await res();
	const cartItems = (await res())?.items || [];
	console.log(cartItems);

	return (
		<div className="bg-gray-50">
			<div className="w-full h-20 lg:h-25 bg-secondry "></div>
			<Stepper />
			<div
				className="bg-gray-50 min-h-screen py-6 px-4 md:px-12 font-[vazir,tahoma]"
				dir="rtl"
			>
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* بخش اصلی لیست محصولات */}
					<div className="lg:col-span-3 space-y-4">
						<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
							{/* Header */}
							<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
								<div className="flex items-center gap-2">
									<ShoppingBag className="text-[#7c3aed]" size={22} />
									<h2 className="text-lg font-bold text-gray-800">سبد خرید</h2>
								</div>
								<span className="text-sm text-gray-400">{data.__v} محصول</span>
							</div>

							{/* Product Item */}
							{cartItems?.map((item: any) => (
								<div
									key={item.id}
									className="p-6 flex flex-col md:flex-row gap-6 border-b border-gray-50 last:border-0"
								>
									{/* بخش تصویر و کنترلر */}
									<div className="flex flex-col items-center gap-4">
										<div className="relative group">
											<img
												src={`${BASE_URL}${item.product.images?.[0]}`}
												alt={item.name}
												className="w-50 h-40 object-fill group-hover:scale-105 transition-transform"
											/>
										</div>

										{/* دکمه‌های کنترل تعداد به سبک دیجی‌کالا */}
										<div className="flex items-center justify-between w-28 border border-gray-200 rounded-lg p-1.5 shadow-sm text-[#7c3aed]">
											<button className="hover:bg-purple-50 p-1 rounded-md transition-colors">
												<Plus size={18} />
											</button>
											<span className="font-bold">۱</span>
											<button className="hover:bg-purple-50 p-1 rounded-md transition-colors text-red-500">
												<Trash2 size={18} />
											</button>
										</div>
									</div>

									{/* اطلاعات محصول */}
									<div className="grow space-y-4">
										<h3 className="text-lg font-bold text-gray-800 leading-snug">
											{item.product.name}
										</h3>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div className="space-y-3">
												<div className="flex items-center gap-3 text-sm text-gray-600">
													<div
														className="w-4 h-4 rounded-full border border-gray-200"
														style={{ backgroundColor: "#a855f7" }}
													></div>
													<span>فول آپشن</span>
												</div>
												<div className="flex items-center gap-3 text-sm text-gray-600">
													<ShieldCheck size={18} className="text-gray-400" />
													<span>گارانتی 18 ماهه رضا روور</span>
												</div>
												<div className="flex items-center gap-3 text-sm text-gray-600">
													<Store size={18} className="text-gray-400" />
													<span>
														فروشنده:{" "}
														<span className="text-purple-600 font-medium">
															رضاروور
														</span>
													</span>
												</div>
											</div>

											<div className="space-y-3">
												<div className="flex items-center gap-3 text-sm text-cyan-600">
													<Truck size={18} />
													<span>ارسال سریع رضاروو (تهران و کرج)</span>
												</div>
												<div className="flex items-center gap-3 text-xs text-orange-500 bg-orange-50 p-2 rounded-lg w-fit">
													<Info size={14} />
													<span>
														تنها {item.product.stock} عدد در انبار باقیست
													</span>
												</div>
											</div>
										</div>

										<div className="pt-4 flex justify-end">
											<div className="text-left">
												<p className="text-2xl font-black text-gray-900">
													{item.price.toLocaleString("fa-IR")}{" "}
													<span className="text-xs font-normal text-gray-400">
														تومان
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* بخش فاکتور پرداخت (Sticky) */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6">
							<div className="space-y-5">
								<div className="flex justify-between text-gray-500 text-sm">
									<span>قیمت کالاها</span>
									<span>{data.totalPrice.toLocaleString("fa-IR")} دلار</span>
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
										<span className="text-[10px] text-gray-400">دلار</span>
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
