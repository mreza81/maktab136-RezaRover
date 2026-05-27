"use client";
import {
	createOrderScheema,
	createOrderScheemaType,
} from "@/scheema/createOrder";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, MapPin, Phone, User } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useOrderStore } from "../hooks/useOrderStor";
import { getCart } from "../services/getCart.service";
import Stepper from "./Stepper";

function Checkout() {
	const storedFormData = useOrderStore((state) => state.shippingAddress);
	const setShippingAddress = useOrderStore((state) => state.setShippingAddress);
	const { paymentMethod, setPaymentMethod } = useOrderStore();
	const [totalPrice, setTotalPrice] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<createOrderScheemaType>({
		resolver: zodResolver(createOrderScheema),
		values: {
			shippingAddress: storedFormData, // اینجا قبلاً به درستی تعریف شده
			paymentMethod: paymentMethod,
		} as any,
	});

	// هندلر ثبت فرم
	const onSubmit = (data: createOrderScheemaType) => {
		setShippingAddress(data.shippingAddress);
		console.log(data);
		console.log(paymentMethod);

		router.push("/payment");
	};

	useEffect(() => {
		const getCartPrice = async () => {
			const res = await getCart();

			setTotalPrice(res.totalPrice);
			if (res.items.length == 0) {
				router.push("/products");
				toast.warning("سبد خرید شما خالی است");
			}
		};
		getCartPrice();
	}, []);

	const router = useRouter();

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* هدر رنگی بالا */}
			<div className="w-full h-20 lg:h-25 bg-secondry"></div>

			{/* کامپوننت استپر */}
			<Stepper />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-[#F8F9FA] pb-32 lg:pb-10"
				dir="rtl"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
					<div className="flex flex-col lg:flex-row gap-6">
						{/* ستون راست: فرم‌های ورودی */}
						<div className="flex-1 space-y-4 lg:space-y-6">
							{/* باکس اطلاعات پستی */}
							<div className="bg-white rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
										<MapPin size={20} />
									</div>
									<h2 className="text-lg lg:text-xl font-bold text-gray-800">
										نشانی تحویل سفارش
									</h2>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
									{/* نام و نام خانوادگی */}
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-500 flex items-center gap-2">
											<User size={14} /> نام و نام خانوادگی
										</label>
										<input
											{...register("shippingAddress.name")}
											type="text"
											className={`w-full p-3.5 bg-gray-50 border ${errors.shippingAddress?.name ? "border-red-500" : "border-gray-200"} rounded-1.5xl focus:border-purple-500 outline-none transition-all text-gray-800`}
											placeholder="مثلا: علی علوی"
										/>
										{errors.shippingAddress?.name && (
											<p className="text-red-500 text-xs mt-1">
												{errors.shippingAddress.name?.message}
											</p>
										)}
									</div>

									{/* شماره تماس */}
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-500 flex items-center gap-2">
											<Phone size={14} /> شماره تماس
										</label>
										<input
											{...register("shippingAddress.phone")}
											type="text"
											className={`w-full p-3.5 bg-gray-50 border ${errors.shippingAddress?.phone ? "border-red-500" : "border-gray-200"} rounded-1.5xl focus:border-purple-500 outline-none text-left text-gray-800`}
											placeholder="09120000000"
										/>
										{errors.shippingAddress?.phone && (
											<p className="text-red-500 text-xs mt-1">
												{errors.shippingAddress.phone.message}
											</p>
										)}
									</div>

									{/* آدرس پستی */}
									<div className="md:col-span-2 space-y-2">
										<label className="text-sm font-medium text-gray-500 flex items-center gap-2">
											<MapPin size={14} /> آدرس دقیق پستی
										</label>
										<textarea
											{...register("shippingAddress.address")}
											rows={3}
											className={`w-full p-3.5 bg-gray-50 border ${errors.shippingAddress?.address ? "border-red-500" : "border-gray-200"} rounded-1.5xl focus:border-purple-500 outline-none text-gray-800`}
											placeholder="استان، شهر، محله، خیابان، پلاک و واحد"
										/>
										{errors.shippingAddress?.address && (
											<p className="text-red-500 text-xs mt-1">
												{errors.shippingAddress.address.message}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* باکس انتخاب روش پرداخت */}
							<div className="bg-white rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
										<ChevronDown size={20} />
									</div>
									<h2 className="text-lg lg:text-xl font-bold text-gray-800">
										شیوه پرداخت
									</h2>
								</div>

								<div className="relative">
									<select
										value={paymentMethod}
										onChange={(e) => setPaymentMethod(e.target.value)}
										className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none appearance-none cursor-pointer font-semibold text-gray-800 focus:ring-2 focus:ring-purple-100 transition-all"
									>
										<option value="cash" className="text-gray-900 bg-white">
											پرداخت نقدی (درب منزل)
										</option>
										<option value="online" className="text-gray-900 bg-white">
											پرداخت اینترنتی (درگاه شتاب)
										</option>
										<option value="wallet">برداشت از کیف پول</option>
									</select>
									{/* آیکون فلش اختصاصی برای select به دلیل استفاده از appearance-none */}
									<div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
										<ChevronDown size={20} />
									</div>
								</div>

								{/* توضیحات داینامیک روش پرداخت */}
								<div className="mt-4 p-4 rounded-xl bg-blue-50 text-blue-700 text-sm leading-6">
									{paymentMethod === "cash" &&
										"💡 در این روش، مبلغ سفارش را هنگام تحویل کالا به مامور ارسال (نقدی یا با کارتخوان سیار) پرداخت می‌کنید."}
									{paymentMethod === "online" &&
										"💡 شما برای پرداخت امن به درگاه مستقیم بانکی متصل خواهید شد. داشتن رمز پویا الزامی است."}
									{paymentMethod === "wallet" &&
										"💡 مبلغ سفارش از موجودی کیف پول شما کسر خواهد شد. (در صورت داشتن موجودی کافی)"}
								</div>
							</div>
						</div>

						{/* ستون چپ: خلاصه سفارش (سایدبار) */}
						<div className="w-full lg:w-95">
							<div className="bg-white rounded-2xl p-6 shadow-lg lg:shadow-sm border border-gray-100 sticky top-8">
								<h3 className="text-lg font-bold mb-6 hidden lg:block text-gray-800">
									خلاصه سفارش
								</h3>
								<div className="space-y-4">
									<div className="flex justify-between text-gray-500">
										<span>قیمت کالاها</span>
										<span className="font-medium text-gray-800 underline decoration-gray-200 underline-offset-8">
											{`${totalPrice.toLocaleString("fa-IR")}دلار`}
										</span>
									</div>
									<div className="flex justify-between text-gray-500">
										<span>هزینه ارسال</span>
										<span className="text-green-600 font-bold">رایگان</span>
									</div>
									<div className="pt-4 border-t border-gray-100 flex justify-between items-center">
										<span className="text-gray-800 font-bold">
											مبلغ قابل پرداخت:
										</span>
										<div className="text-left">
											<span className="text-2xl font-black text-purple-600">
												{totalPrice.toLocaleString("fa-ir")}
											</span>
											<span className="text-xs text-gray-400 mr-1 font-bold">
												دلار
											</span>
										</div>
									</div>

									{/* دکمه ثبت فرم در دسکتاپ */}

									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-purple-100 mt-4 disabled:bg-gray-300 disabled:shadow-none cursor-pointer"
									>
										{isSubmitting ? "در حال پردازش..." : "تایید و ثبت نهایی"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* نوار ثابت پایین در حالت موبایل */}
				<div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex items-center justify-between lg:hidden z-50">
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors"
					>
						{isSubmitting ? "صبور باشید..." : "ثبت نهایی"}
					</button>
					<div className="text-left">
						<div className="text-xs text-gray-400">مبلغ نهایی:</div>
						<div className="font-black text-purple-600 text-lg">
							{totalPrice}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Checkout;
