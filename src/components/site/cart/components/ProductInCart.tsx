"use client";
import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import {
	AlertTriangle,
	Info,
	Minus,
	Plus,
	ShieldCheck,
	Store,
	Trash2,
	Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateCart } from "../services/updateCart.service";
import { deletFromCart } from "../services/deletItemInCart.service";
import { toast } from "react-toastify";

function ProductInCart({ item, key }: { item: any; key: string }) {
	const [count, setCount] = useState(item.quantity);
	const [openModal, setOpenModal] = useState(false);

	const router = useRouter();

	const handleUpdate = async (id: string, quantity: number) => {
		const res = await updateCart(id, quantity);
		router.refresh();
	};
	const handleDelete = async (id: string) => {
		try {
			const res = await deletFromCart(id);
			toast.success("🎉 محصول با موفقیت از سبد خرید حذف شد");
			router.refresh();
		} catch {}
	};

	return (
		<div
			key={key}
			className="p-6 flex flex-col md:flex-row gap-6 border-b border-gray-50 last:border-0"
		>
			{/* بخش تصویر و کنترلر */}
			<div className="flex flex-col items-center gap-4">
				<div className="relative group">
					<img
						src={`${BASE_URL}${item.product.images?.[0]}`}
						alt={item.product.name}
						className="w-50 h-30 object-contain group-hover:scale-105 transition-transform"
					/>
				</div>

				{/* دکمه‌های کنترل تعداد */}
				<div className="flex items-center justify-between w-28 border border-gray-200 rounded-lg p-1.5 shadow-sm text-[#7c3aed]">
					<button className="hover:bg-purple-50 p-1 rounded-md transition-colors">
						{count < item.product.stock ? (
							<Plus
								size={18}
								className="cursor-pointer"
								onClick={() => {
									const newQty = count + 1; // مقدار جدید را اینجا محاسبه می‌کنیم
									setCount(newQty);
									handleUpdate(item._id, newQty);
								}}
							/>
						) : (
							<Plus size={18} className="disabled cursor-none opacity-20" />
						)}
					</button>

					<span className="font-bold text-lg">{count}</span>

					<button className="hover:bg-purple-50 p-1 rounded-md transition-colors text-red-500">
						{count > 1 ? (
							<Minus
								size={18}
								onClick={() => {
									const newQty = count - 1;
									setCount(newQty);
									handleUpdate(item._id, newQty);
								}}
								className="cursor-pointer"
							/>
						) : (
							<Trash2
								size={18}
								className="cursor-pointer"
								onClick={() => setOpenModal(true)}
							/>
						)}
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
							<span>گارانتی ۱۸ ماهه رضا روور</span>
						</div>
						<div className="flex items-center gap-3 text-sm text-gray-600">
							<Store size={18} className="text-gray-400" />
							<span>
								فروشنده:{" "}
								<span className="text-purple-600 font-medium">رضاروور</span>
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
							<span>آماده ارسال</span>
						</div>
					</div>
				</div>

				{/* بخش قیمت: قیمت واحد و قیمت کل آیتم */}
				<div className="pt-4 flex flex-col items-end gap-1">
					{/* قیمت واحد - فقط اگر تعداد بیشتر از ۱ باشد */}
					{count > 1 && (
						<div className="text-gray-400 text-sm flex items-center gap-1">
							<span>قیمت واحد:</span>
							<span>{item.product.price.toLocaleString("fa-IR")}</span>
							<span className="text-[10px]">دلار</span>
						</div>
					)}

					<div className="text-left">
						<p className="text-2xl font-black text-gray-900">
							{(item.product.price * item.quantity).toLocaleString("fa-IR")}{" "}
							<span className="text-xs font-normal text-gray-400">دلار</span>
						</p>
					</div>
				</div>
			</div>
			{openModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
					<div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
						{/* آیکون */}
						<div className="mx-auto w-16 h-16 bg-purple-50 flex items-center justify-center rounded-full mb-4">
							<Trash2 className="text-purple-600" size={32} />
						</div>

						{/* متن */}
						<p className="text-gray-800 font-bold text-lg mb-8">
							آیا از حذف این محصول مطمئنید؟
						</p>

						{/* دکمه‌ها */}
						<div className="flex gap-3">
							<button
								onClick={() => setOpenModal(false)}
								className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition cursor-pointer"
							>
								خیر
							</button>
							<button
								// onClick={onConfirm}
								className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition cursor-pointer"
								onClick={() => handleDelete(item._id)}
							>
								بله
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductInCart;
