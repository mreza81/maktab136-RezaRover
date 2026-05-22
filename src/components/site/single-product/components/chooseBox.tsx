"use client";
import { ProductType } from "@/types/productTypeAndOrders";
import { useState } from "react";

function ChooseBox({ product }: { product: ProductType }) {
	const [count, setCount] = useState(1);

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

	return (
		<div className="w-full min-w-65 rounded-xl bg-[#F5F3FF] p-6 md:px-7 shadow-sm border border-purple-200 flex flex-col gap-6">
			{/* لوگو + قیمت */}
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

			{/* آخرین بروزرسانی */}
			<div className="flex justify-between items-center">
				<span className="text-lg font-semibold text-gray-900">
					آخرین بروزرسانی
				</span>
				<span className="text-gray-700">
					{new Date(product.updatedAt).toLocaleDateString("fa-IR")}
				</span>
			</div>

			{/* تعداد موجودی */}
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<span className="text-lg font-semibold text-gray-900">موجودی</span>
					<span className="text-lg font-semibold text-gray-900">
						{product.stock}
					</span>
				</div>
			</div>

			{/* کنترل تعداد */}
			<div>
				<div className="flex items-center justify-between bg-white border border-purple-200 rounded-lg px-4 py-2">
					{/* دکمه افزایش */}
					<button
						onClick={increase}
						disabled={count === product.stock}
						className={`
              w-8 h-8 flex items-center justify-center rounded-md text-lg
              ${
								count === product.stock
									? "bg-purple-300 text-white cursor-not-allowed"
									: "bg-purple-600 text-white hover:bg-purple-700"
							}
            `}
					>
						+
					</button>

					{/* مقدار */}
					<span className="font-bold text-gray-900 text-lg">{count}</span>

					{/* دکمه کاهش */}
					<button
						onClick={decrease}
						disabled={count === 1}
						className={`
              w-8 h-8 flex items-center justify-center rounded-md text-lg
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

			{/* دکمه سفارش */}
			<button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-lg font-bold shadow-md">
				ثبت سفارش
			</button>
		</div>
	);
}

export default ChooseBox;
