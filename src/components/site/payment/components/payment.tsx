"use client";
import { Calendar, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useOrderStore } from "../../checkout/hooks/useOrderStor";
import { getCart } from "../../checkout/services/getCart.service";
import { createOrder } from "../services/createOrder.services";
import Stepper from "./Stepper";

function Payment() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const shippingAddress = useOrderStore((state) => state.shippingAddress);
	const paymentMethod = useOrderStore((state) => state.paymentMethod);

	const data = {
		shippingAddress,
		paymentMethod,
	};
	const handlePayment = () => {
		setLoading(true);
		// شبیه‌سازی اتصال به درگاه
		setTimeout(() => {
			setLoading(false);
			// اینجا می‌توانید کاربر را به صفحه "سفارش با موفقیت ثبت شد" هدایت کنید
			alert("پرداخت با موفقیت انجام شد!");
			router.push("/");
		}, 2000);
	};

	useEffect(() => {
		const getCartPrice = async () => {
			const res = await getCart();
			setTotalPrice(res.totalPrice);
			if (res.items.length == 0) {
				router.push("/products");
				toast.warning("سبد خرید شما خالی است");
			}
			console.log(data);
		};
		getCartPrice();
	}, []);

	const handleCreateOrder = async (data: any) => {
		try {
			const res = await createOrder(data);
			toast.success("سفارش شما با موفقیت ثبت شد");
			router.push("/myOrders");
			return res;
		} catch (error: any) {
			toast.error("عملیات با خطا مواجه شد لطفا بار دیگر امتحان نمایید");
			router.push("/checkout");
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="w-full h-20 lg:h-25 bg-secondry"></div>

			<Stepper />
			<div className="min-h-screen bg-gray-50 font-sans p-4" dir="rtl">
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
					{/* ستون اصلی: فرم پرداخت */}
					<div className="md:col-span-8 space-y-6">
						<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
							{/* هدر درگاه */}
							<div className="bg-purple-600 p-6 text-white flex justify-between items-center">
								<div className="flex items-center gap-3">
									<ShieldCheck size={32} />
									<div>
										<h1 className="text-lg font-bold">درگاه پرداخت امن</h1>
										<p className="text-xs opacity-80">
											شرکت پرداخت الکترونیک رضاروور
										</p>
									</div>
								</div>
							</div>

							<form onSubmit={handlePayment} className="p-8 space-y-6">
								{/* شماره کارت */}
								<div className="space-y-2">
									<label className="text-sm font-bold text-gray-700 flex items-center gap-2">
										<CreditCard size={18} className="text-purple-600" />
										شماره کارت
									</label>
									<div className="grid grid-cols-4 gap-2" dir="ltr">
										{[1, 2, 3, 4].map((i) => (
											<input
												key={i}
												type="text"
												maxLength={4}
												placeholder="****"
												className="w-full h-12 text-center border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:outline-none text-lg tracking-widest font-bold"
												required
											/>
										))}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* CVV2 */}
									<div className="space-y-2">
										<label className="text-sm font-bold text-gray-700 flex items-center gap-2">
											<Lock size={18} className="text-purple-600" />
											شماره شناسایی دوم (CVV2)
										</label>
										<input
											type="password"
											maxLength={4}
											className="w-full h-12 px-4 border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:outline-none font-bold"
											required
										/>
									</div>

									{/* تاریخ انقضا */}
									<div className="space-y-2">
										<label className="text-sm font-bold text-gray-700 flex items-center gap-2">
											<Calendar size={18} className="text-purple-600" />
											تاریخ انقضا
										</label>
										<div className="flex items-center gap-2">
											<input
												type="text"
												placeholder="ماه"
												maxLength={2}
												className="w-full h-12 text-center border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:outline-none"
												required
											/>
											<span className="text-gray-400">/</span>
											<input
												type="text"
												placeholder="سال"
												maxLength={2}
												className="w-full h-12 text-center border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:outline-none"
												required
											/>
										</div>
									</div>
								</div>

								{/* رمز پویا */}
								<div className="space-y-2">
									<label className="text-sm font-bold text-gray-700">
										رمز کارت
									</label>
									<div className="flex gap-2">
										<input
											type="password"
											className="flex-1 h-12 px-4 border-2 border-gray-100 rounded-xl focus:border-purple-500 focus:outline-none font-bold"
											placeholder="رمز دوم یا رمز پویا"
											required
										/>
										<button
											type="button"
											className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-colors"
										>
											دریافت رمز پویا
										</button>
									</div>
								</div>

								{/* دکمه‌های عملیاتی */}
								<div className="pt-4 flex flex-col md:flex-row gap-3">
									<button
										type="button"
										disabled={loading}
										className="flex-2 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
										onClick={() => {
											handleCreateOrder(data);
										}}
									>
										{loading ? "در حال تایید..." : "پرداخت نهایی"}
									</button>
									<button
										type="button"
										onClick={() => router.back()}
										className="flex-1 h-14 bg-gray-50 text-gray-500 border border-gray-200 rounded-xl font-bold hover:bg-gray-100 transition-all"
									>
										انصراف
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* ستون کناری: جزئیات فاکتور */}
					<div className="md:col-span-4 space-y-6">
						<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
							<h2 className="font-bold text-gray-800 mb-6 border-b pb-4">
								جزئیات تراکنش
							</h2>

							<div className="space-y-4">
								<div className="flex justify-between text-sm">
									<span className="text-gray-400">پذیرنده:</span>
									<span className="text-gray-700 font-medium">
										فروشگاه رضا‌روور
									</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-400">شماره ترمینال:</span>
									<span className="text-gray-700 font-medium">8852140</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-gray-400">شماره فاکتور:</span>
									<span className="text-gray-700 font-medium">#10254</span>
								</div>
								<div className="pt-4 border-t flex justify-between items-center">
									<span className="text-gray-800 font-bold">مبلغ کل:</span>
									<div className="text-left">
										<div className="text-xl font-black text-purple-600">
											{totalPrice.toLocaleString("fa-ir")}
										</div>
										<div className="text-[10px] text-gray-400 uppercase">
											دلار
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex gap-3">
							<ShieldCheck className="text-blue-500 shrink-0" size={20} />
							<p className="text-[11px] text-blue-700 leading-relaxed">
								تمام اطلاعات بانکی شما نزد ما محفوظ است لطفا با خیال راحت خرید
								کنید.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
