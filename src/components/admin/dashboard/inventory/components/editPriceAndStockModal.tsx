"use client";

import {
	editProductScheema,
	EditProductScheemaType,
} from "@/scheema/editProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editProduct } from "../../get products/services/editProduct.service";

export default function EditModal({
	openEdditModal,
	setOpenEdditModal,
	productId,
	setProductId,
}: {
	openEdditModal: boolean;
	setOpenEdditModal: React.Dispatch<React.SetStateAction<boolean>>;
	productId: string;
	setProductId: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [enabled, setEnabled] = useState({
		price: false,
		stock: false,
	});

	const {
		register,
		handleSubmit,

		setError,

		formState: { errors },
	} = useForm<EditProductScheemaType>({
		resolver: zodResolver(editProductScheema),
		defaultValues: {
			price: 0,
			stock: 0,
		},
	});

	const queryClient = useQueryClient();

	const submit = async (data: EditProductScheemaType) => {
		let hasError = false;
		// ۲. چک کردن دستی: اگر تیک خورده ولی خالی است، خطا بده
		if (enabled.price && (!data.price || data.price <= 0)) {
			setError("price", { message: "قیمت معتبر وارد کنید" });
			hasError = true;
		}
		if (enabled.stock && !data.stock) {
			setError("stock", { message: "مقدار معتبر  وارد کنید" });
			hasError = true;
		}
		// اگر خطایی وجود داشت، متوقف شو
		if (hasError) return;
		try {
			const formData = new FormData();
			if (enabled.price) formData.append("price", String(data.price!));
			if (enabled.stock) formData.append("stock", String(data.stock!));

			const res = await editProduct(formData, productId);

			if (res) {
				toast.success("محصول با موفقیت ویرایش شد");
				queryClient.invalidateQueries({ queryKey: ["products"] });
				setOpenEdditModal(false);
			}
		} catch (error: any) {
			// حل مشکل خطای Cannot read properties of undefined (reading 'data')
			const message =
				error.response?.data?.message || error.message || "خطایی رخ داد";
			toast.error(message);
		}
	};

	if (!openEdditModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="w-full max-w-md rounded-2xl bg-[#0d1b2a] p-6 text-white shadow-xl">
				<h2 className="text-center text-lg font-bold mb-6">
					ویرایش قیمت و موجودی
				</h2>

				<div className="space-y-8">
					{/* price */}
					<div className="relative">
						<div className="flex items-center gap-2 mb-1">
							<input
								type="checkbox"
								onChange={(e) =>
									setEnabled({ ...enabled, price: e.target.checked })
								}
							/>
							<label className="text-sm">قیمت</label>
						</div>

						<input
							disabled={!enabled.price}
							type="number"
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-30"
							{...register("price", { valueAsNumber: true })}
							onInput={(e: React.FormEvent<HTMLInputElement>) => {
								const input = e.currentTarget; // استفاده از currentTarget به جای target
								if (input.value.length > 1 && input.value.startsWith("0")) {
									input.value = input.value.replace(/^0+/, "");
								}
							}}
						/>
						{errors.price && enabled.price && (
							<p className="text-red-400 text-xs mt-1 absolute -bottom-[2]">
								{errors.price.message}
							</p>
						)}
					</div>

					{/* stock */}
					<div className="relative">
						<div className="flex items-center gap-2 mb-1">
							<input
								type="checkbox"
								onChange={(e) =>
									setEnabled({ ...enabled, stock: e.target.checked })
								}
							/>
							<label className="text-sm">موجودی</label>
						</div>

						<input
							disabled={!enabled.stock}
							type="number"
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-30"
							{...register("stock", { valueAsNumber: true })}
							onInput={(e: React.FormEvent<HTMLInputElement>) => {
								const input = e.currentTarget; // استفاده از currentTarget به جای target
								if (input.value.length > 1 && input.value.startsWith("0")) {
									input.value = input.value.replace(/^0+/, "");
								}
							}}
						/>
						{errors.stock && enabled.stock && (
							<p className="text-red-400 text-xs mt-1 absolute -bottom-[2]">
								{errors.stock.message}
							</p>
						)}
					</div>

					{/* buttons */}
					<div className="flex justify-between pt-4">
						<button
							className="px-4 py-2 bg-gray-600 rounded-md"
							onClick={() => setOpenEdditModal(false)}
						>
							بستن
						</button>

						<button
							className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-30"
							disabled={!enabled.price && !enabled.stock}
							onClick={handleSubmit(submit)}
						>
							ذخیره
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
