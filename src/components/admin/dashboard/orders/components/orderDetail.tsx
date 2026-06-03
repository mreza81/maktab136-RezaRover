"use client";

import { useState } from "react";
import { updateOrderStatus } from "../services/updeteOrderStatus";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function OrderDetailsModal({
	openOrderModal,
	setOpenOrderModal,
	order,
}: {
	openOrderModal: boolean;
	setOpenOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
	order: any;
}) {
	const [orderStatus, setOrderStatus] = useState("");
	const queryClient = useQueryClient();
	const handleUpdateOrderStatus = async () => {
		try {
			const res = await updateOrderStatus(order._id, { status: orderStatus });
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			toast.success("🎉بروزرسانی وضعیت سفارش با موفقیت انجام شد");
			setOpenOrderModal(false);
			return res;
		} catch {}
	};
	if (!openOrderModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
			<div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d1b2a] p-7 shadow-2xl text-white vertical-scroll-rtl">
				<div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
					<h1 className="text-2xl font-bold text-secondry">جزئیات سفارش</h1>
					<span className="text-sm text-gray-400">شناسه: {order?._id}</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* بخش اطلاعات مشتری */}
					<div className="space-y-4 bg-[#1b263b] p-4 rounded-xl">
						<h2 className="text-lg font-semibold border-r-4 border-secondry pr-2 mb-4">
							اطلاعات مشتری
						</h2>
						<div>
							<label className="block mb-1 text-xs text-gray-400">
								نام و نام خانوادگی
							</label>
							<div className="text-white font-medium">
								{order?.user?.name || "—"}
							</div>
						</div>
						<div>
							<label className="block mb-1 text-xs text-gray-400">ایمیل</label>
							<div className="text-white font-medium">
								{order?.user?.email || "—"}
							</div>
						</div>
						<div>
							<label className="block mb-1 text-xs text-gray-400">
								شماره تماس
							</label>
							<div className="text-white font-medium" dir="ltr">
								{order?.shippingAddress?.phone || "—"}
							</div>
						</div>
					</div>

					{/* بخش اطلاعات ارسال */}
					<div className="space-y-4 bg-[#1b263b] p-4 rounded-xl">
						<h2 className="text-lg font-semibold border-r-4 border-blue-500 pr-2 mb-4">
							جزئیات ارسال
						</h2>
						<div>
							<label className="block mb-1 text-xs text-gray-400">
								آدرس دقیق
							</label>
							<div className="text-white font-medium leading-relaxed">
								{order?.shippingAddress?.address || "—"}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div>
								<label className="block mb-1 text-xs text-gray-400">
									روش پرداخت
								</label>
								<div className="text-white font-medium">
									{order?.paymentMethod || "—"}
								</div>
							</div>
							<div>
								<label className="block mb-1 text-xs text-gray-400">
									وضعیت پرداخت
								</label>
								<div className="font-medium text-green-400">پرداخت شده</div>
							</div>
						</div>
					</div>
				</div>

				{/* بخش محصولات سفارش داده شده */}
				<div className="mt-8">
					<h2 className="text-lg font-semibold mb-4 pr-2">اقلام سفارش</h2>
					<div className="bg-[#1b263b] rounded-xl overflow-hidden">
						<table className="w-full text-right">
							<thead className="bg-white/5 text-gray-300 text-sm">
								<tr>
									<th className="p-3">نام محصول</th>
									<th className="p-3">تعداد</th>
									<th className="p-3">قیمت واحد</th>
									<th className="p-3">جمع کل</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/5">
								{order?.orderItems?.map((item: any, idx: number) => (
									<tr key={idx} className="hover:bg-white/5 transition-colors">
										<td className="p-3 text-sm">{item.name}</td>
										<td className="p-3 text-sm font-mono">{item.quantity}</td>
										<td className="p-3 text-sm font-mono">
											{item.price.toLocaleString()}
										</td>
										<td className="p-3 text-sm font-mono">
											{(item.price * item.quantity).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* بخش مدیریت وضعیت و مبالغ نهایی */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t border-white/10 pt-6">
					<div className="space-y-3">
						<label className="block text-sm font-medium text-gray-300">
							تغییر وضعیت سفارش
						</label>
						<select
							className="w-full bg-[#1b263b] border border-white/20 rounded-lg p-3 outline-none focus:border-secondry transition-all"
							defaultValue={order?.status}
							onChange={(e) => setOrderStatus(e.target.value)}
						>
							<option value="" disabled>
								انتخاب وضعیت جدید...
							</option>
							<option value="pending">در انتظار بررسی</option>
							<option value="confirmed">تایید شده</option>
							<option value="shipping">درحال ارسال</option>
							<option value="delivered">تحویل داده شده</option>
							<option value="cancelled">لغو شده</option>
						</select>
					</div>

					<div className="bg-[#243049] p-4 rounded-xl space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-gray-400">جمع کل کالاها:</span>
							<span>{order?.totalPrice?.toLocaleString()} دلار</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-gray-400">هزینه ارسال:</span>
						</div>
						<div className="flex justify-between text-lg font-bold text-green-400 pt-2 border-t border-white/5">
							<span>مبلغ قابل پرداخت:</span>
							<span>{order?.totalPrice?.toLocaleString()} دلار</span>
						</div>
					</div>
				</div>

				{/* دکمه‌های عملیاتی */}
				<div className="flex justify-end gap-4 mt-8">
					<button
						onClick={() => setOpenOrderModal(false)}
						className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all cursor-pointer"
					>
						انصراف
					</button>
					<button
						className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all cursor-pointer"
						onClick={handleUpdateOrderStatus}
					>
						بروزرسانی وضعیت سفارش
					</button>
				</div>
			</div>
		</div>
	);
}
