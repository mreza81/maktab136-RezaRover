"use client";
import { ProductType } from "@/types/productTypeAndOrders";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart, Data } from "../services/addToCart.service";

function ChooseBox({ product }: { product: ProductType }) {
	const [count, setCount] = useState(1);
	const router = useRouter();
	const increase = () => {
		if (count < product.stock) {
			setCount(count + 1);
		}
	};

	const decrease = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const handleAddToCart = async () => {
		const accesstoken = Cookies.get("access-token");
		const refreshtoken = Cookies.get("refresh-token");

		if (!accesstoken && !refreshtoken) {
			toast.warning("برای انتخاب محصول باید احرازهویت کنید");

			return;
		}
		try {
			const data: Data = {
				productId: product._id,
				quantity: count,
			};

			const res = await addToCart(data);
			toast.success(
				<div>
					<div style={{ marginBottom: 8 }}>
						محصول با موفقیت به سبد خرید اضافه شد.
					</div>

					<div style={{ display: "flex", gap: 12 }}>
						<Link href="/cart" className="text-secondry cursor-pointer">
							مشاهده سبد خرید
						</Link>
					</div>
				</div>,
			);
		} catch (error: any) {
			throw new Error(error);
		}
	};
	return (
		<div className="w-full min-w-65 rounded-xl bg-[#F5F3FF] p-6 md:px-7 shadow-sm border border-purple-200 flex flex-col gap-6">
			<div className="flex flex-col items-center justify-between gap-4">
				<img
					src="/assets/images/5a1465fa-9e6b-4f2d-9751-bf48e4568742.png"
					alt="لوگو"
					className="w-30 h-30 object-contain"
				/>

				<div className="flex justify-between items-center w-full">
					<span className="text-lg font-semibold text-gray-900">قیمت</span>
					<span className="text-xl font-extrabold text-purple-700">
						{product.price.toLocaleString()} $
					</span>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<span className="text-lg font-semibold text-gray-900">
					آخرین بروزرسانی
				</span>
				<span className="text-gray-700">
					{new Date(product.updatedAt).toLocaleDateString("fa-IR")}
				</span>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<span className="text-lg font-semibold text-gray-900">موجودی</span>
					<span className="text-lg font-semibold text-gray-900">
						{product.stock}
					</span>
				</div>
			</div>

			<div>
				<div className="flex items-center justify-between bg-white border border-purple-200 rounded-lg px-4 py-2">
					<button
						onClick={increase}
						disabled={count === product.stock}
						className={`
              w-8 h-8 flex items-center justify-center rounded-md text-lg cursor-pointer
              ${
								count === product.stock
									? "bg-purple-300 text-white cursor-not-allowed"
									: "bg-purple-600 text-white hover:bg-purple-700"
							}
            `}
					>
						+
					</button>

					<span className="font-bold text-gray-900 text-lg">{count}</span>

					<button
						onClick={decrease}
						disabled={count === 1}
						className={`
              w-8 h-8 flex items-center justify-center rounded-md text-lg cursor-pointer
              ${
								count === 1
									? "bg-purple-300 text-white cursor-not-allowed"
									: "bg-purple-600 text-white hover:bg-purple-700"
							}
            `}
					>
						–
					</button>
				</div>
			</div>

			<button
				className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-lg font-bold shadow-md cursor-pointer"
				onClick={() => handleAddToCart()}
			>
				ثبت سفارش
			</button>
		</div>
	);
}

export default ChooseBox;
