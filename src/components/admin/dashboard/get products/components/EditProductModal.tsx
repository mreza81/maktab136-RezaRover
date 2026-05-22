"use client";
import {
	editProductScheema,
	EditProductScheemaType,
} from "@/scheema/editProduct";
import ProductEditor from "@/shared/TextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editProduct } from "../services/editProduct.service";

export default function EditProductModal({
	openEdditModal,
	setOpenEdditModal,
	productId,
	setProductId,
	name,
	brand,
	price,
	stock,
	description,
	category,
}: {
	openEdditModal: boolean;
	setOpenEdditModal: React.Dispatch<React.SetStateAction<boolean>>;
	productId: string;
	setProductId: React.Dispatch<React.SetStateAction<string>>;
	name: string;
	brand: string;
	price: number;
	stock: number;
	description: string;
	category: string;
}) {
	const [enabled, setEnabled] = useState({
		name: false,
		description: false,
		price: false,
		brand: false,
		stock: false,
		category: false,
	});

	const getPlainText = (html?: string) => {
		if (!html) return "";
		return html
			.replace(/<[^>]*>/g, "")
			.replace(/&nbsp;/g, " ")
			.trim();
	};

	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		control,
		setError,
		setValue,
		reset,
		formState: { errors },
		// watch, // برای دیباگ اگر خواستی
	} = useForm<EditProductScheemaType>({
		resolver: zodResolver(editProductScheema),
		mode: "onChange",
	});

	// ✅ وقتی مودال باز شد، فرم را با مقادیر محصول پر کن
	useEffect(() => {
		if (openEdditModal) {
			reset({
				name,
				brand,
				price,
				stock,
				category,
				description,
			});

			// اگر می‌خواهی تیک‌ها هم خودکار فعال شوند، این را باز کن:
			// setEnabled({
			//   name: true,
			//   brand: true,
			//   price: true,
			//   stock: true,
			//   category: true,
			//   description: true,
			// });
		}
	}, [openEdditModal, name, brand, price, stock, category, description, reset]);

	const submit = async (data: EditProductScheemaType) => {
		let hasError = false;

		if (enabled.name && !data.name?.trim()) {
			setError("name", { message: "نام محصول را وارد کنید" });
			hasError = true;
		}
		if (enabled.brand && !data.brand?.trim()) {
			setError("brand", { message: "نام برند را وارد کنید" });
			hasError = true;
		}
		if (enabled.price && (!data.price || data.price <= 0)) {
			setError("price", { message: "قیمت معتبر وارد کنید" });
			hasError = true;
		}
		if (enabled.category && !data.category) {
			setError("category", { message: "یک دسته‌بندی انتخاب کنید" });
			hasError = true;
		}
		if (enabled.stock && !data.stock) {
			setError("stock", { message: "مقدار معتبر  وارد کنید" });
			hasError = true;
		}
		if (enabled.description && !getPlainText(data.description)) {
			setError("description", { message: "توضیحات الزامی است" });
			hasError = true;
		}

		if (hasError) return;

		try {
			const formData = new FormData();

			if (enabled.name) formData.append("name", data.name!);
			if (enabled.description)
				formData.append("description", data.description!);
			if (enabled.price) formData.append("price", String(data.price!));
			if (enabled.stock) formData.append("stock", String(data.stock!));
			if (enabled.category) formData.append("category", data.category!);
			if (enabled.brand) formData.append("brand", data.brand!);

			const res = await editProduct(formData, productId);

			if (res) {
				toast.success("محصول با موفقیت ویرایش شد");
				queryClient.invalidateQueries({ queryKey: ["products"] });
				setOpenEdditModal(false);
			}
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error.message || "خطایی رخ داد";
			toast.error(message);
		}
	};

	const isAnyEnabled = Object.values(enabled).some(Boolean);

	if (!openEdditModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d1b2a] p-6 shadow-xl text-white">
				<h1 className="text-center text-xl font-bold mb-6">ویرایش محصول</h1>

				<form onSubmit={handleSubmit(submit)}>
					<div className="space-y-10">
						{/* name */}
						<div className="relative">
							<div className="flex items-center gap-2 mb-1 ">
								<input
									type="checkbox"
									onChange={(e) =>
										setEnabled((prev) => ({ ...prev, name: e.target.checked }))
									}
								/>
								<label className="text-sm">نام</label>
							</div>

							<input
								disabled={!enabled.name}
								type="text"
								{...register("name")}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-20"
							/>
							{errors.name && enabled.name && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.name.message}
								</p>
							)}
						</div>

						<div className="grid grid-cols-2 gap-4">
							{/* price */}
							<div className="relative">
								<div className="flex items-center gap-2 mb-1">
									<input
										type="checkbox"
										onChange={(e) =>
											setEnabled((prev) => ({
												...prev,
												price: e.target.checked,
											}))
										}
									/>
									<label className="text-sm">قیمت</label>
								</div>

								<input
									disabled={!enabled.price}
									className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-20"
									type="number"
									{...register("price", { valueAsNumber: true })}
									onInput={(e: React.FormEvent<HTMLInputElement>) => {
										const input = e.currentTarget;
										if (input.value.length > 1 && input.value.startsWith("0")) {
											input.value = input.value.replace(/^0+/, "");
										}
									}}
								/>
								{errors.price && enabled.price && (
									<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
										{errors.price.message}
									</p>
								)}
							</div>

							{/* brand */}
							<div className="relative">
								<div className="flex items-center gap-2 mb-1">
									<input
										type="checkbox"
										onChange={(e) =>
											setEnabled((prev) => ({
												...prev,
												brand: e.target.checked,
											}))
										}
									/>
									<label className="text-sm">برند</label>
								</div>

								<input
									disabled={!enabled.brand}
									className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-20"
									type="text"
									{...register("brand")}
								/>
								{errors.brand && enabled.brand && (
									<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
										{errors.brand.message}
									</p>
								)}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{/* stock */}
							<div className="relative">
								<div className="flex items-center gap-2 mb-1">
									<input
										type="checkbox"
										onChange={(e) =>
											setEnabled((prev) => ({
												...prev,
												stock: e.target.checked,
											}))
										}
									/>
									<label className="text-sm">موجودی</label>
								</div>

								<input
									disabled={!enabled.stock}
									className="w-full bg-[#1b263b] px-3 py-2 rounded-md disabled:opacity-20"
									type="number"
									{...register("stock", { valueAsNumber: true })}
									onInput={(e: React.FormEvent<HTMLInputElement>) => {
										const input = e.currentTarget;
										if (input.value.length > 1 && input.value.startsWith("0")) {
											input.value = input.value.replace(/^0+/, "");
										}
									}}
								/>
								{errors.stock && enabled.stock && (
									<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
										{errors.stock.message}
									</p>
								)}
							</div>

							{/* category */}
							<div className="relative">
								<div className="flex items-center gap-2 mb-1">
									<input
										type="checkbox"
										onChange={(e) =>
											setEnabled((prev) => ({
												...prev,
												category: e.target.checked,
											}))
										}
									/>
									<label className="text-sm">دسته‌بندی</label>
								</div>

								<select
									disabled={!enabled.category}
									className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-20"
									{...register("category")}
								>
									<option value="">یک دسته‌بندی انتخاب کنید</option>
									<option value="سدان">سدان</option>
									<option value="کانورتیبل">کانورتیبل</option>
									<option value="کوپه">کوپه</option>
									<option value="شاسی بلند">شاسی بلند</option>
								</select>
								{errors.category && enabled.category && (
									<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
										{errors.category.message}
									</p>
								)}
							</div>
						</div>

						{/* description */}
						<div>
							<div className="flex items-center gap-2 mb-1">
								<input
									type="checkbox"
									onChange={(e) =>
										setEnabled((prev) => ({
											...prev,
											description: e.target.checked,
										}))
									}
								/>
								<label className="text-sm">توضیحات</label>
							</div>

							<div
								className={`relative ${
									!enabled.description ? "opacity-40 pointer-events-none" : ""
								}`}
							>
								<Controller
									name="description"
									control={control}
									render={({ field }) => (
										<ProductEditor
											key={productId}
											value={field.value || ""}
											onChange={(value: string) => {
												field.onChange(value); // ✅ فقط همین؛ بقیه را خود RHF انجام می‌دهد
											}}
										/>
									)}
								/>
								{errors.description && enabled.description && (
									<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
										{errors.description.message}
									</p>
								)}
							</div>
						</div>

						<div className="flex justify-between pt-5">
							<button
								type="button"
								onClick={() => setOpenEdditModal(false)}
								className="px-4 py-2 bg-gray-500 rounded-md"
							>
								انصراف
							</button>

							<button
								className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-20"
								type="submit"
								disabled={!isAnyEnabled}
							>
								ذخیره تغییرات
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
