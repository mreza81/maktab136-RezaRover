"use client";

import { addProductScheema, AddProductScheemaType } from "@/scheema/addProduct";
import ProductEditor from "@/shared/TextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleAddProduct } from "../services/addProduct.service";

export default function AddProductModalUI({
	openAddModal,
	setOpenAddModal,
}: {
	openAddModal: boolean;
	setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<AddProductScheemaType>({
		resolver: zodResolver(addProductScheema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category: "",
			brand: "",
			images: [],
		},
	});

	const queryClient = useQueryClient();

	const submit = async (data: AddProductScheemaType) => {
		try {
			// ایجاد شیء FormData برای ارسال فایل و متن با هم
			const formData = new FormData();

			// اضافه کردن فیلدهای متنی
			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("price", String(data.price));
			formData.append("stock", String(data.stock));
			formData.append("category", data.category);
			formData.append("brand", data.brand);

			// اضافه کردن عکس‌ها
			if (data.images && data.images.length > 0) {
				data.images.forEach((file) => {
					formData.append("images", file); // مطمئن شو بک‌انر هم همین نام images را می‌خواند
				});
			}

			// ارسال formData به جای data
			const res = await handleAddProduct(formData);

			if (res) {
				toast.success("محصول با موفقیت اضافه شد");
				queryClient.invalidateQueries({ queryKey: ["products"] });
				setOpenAddModal(false); // بستن مودال بعد از موفقیت
			}
		} catch (error: any) {
			// حل مشکل خطای Cannot read properties of undefined (reading 'data')
			const message =
				error.response?.data?.message || error.message || "خطایی رخ داد";
			toast.error(message);
		}
	};
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const newFilesArray = Array.from(files); // عکس‌های جدیدی که کاربر انتخاب کرده

		// 1. دریافت لیست عکس‌های قبلی که قبلاً در فرم ذخیره شده بودند
		const previousFiles = getValues("images") || []; // استفاده از getValues برای خواندن مقادیر فعلی فرم

		// 2. ترکیب لیست قبلی با لیست جدید
		const updatedFiles = [...previousFiles, ...newFilesArray];

		// 3. ذخیره لیست کامل (قبلی + جدید) در فرم
		setValue("images", updatedFiles, {
			shouldValidate: true,
		});

		// 4. آپدیت کردن پیش‌نمایش‌ها (که این قسمت در کد شما درست است)
		const imageUrls = newFilesArray.map((file) => URL.createObjectURL(file));
		setUploadedImages((prev) => [...prev, ...imageUrls]);

		// 5. پاک کردن مقدار input file برای اینکه کاربر بتواند دوباره همین فایل‌ها را انتخاب کند (اگر لازم بود)
		e.target.value = "";
	};

	const handleRemoveImage = (index: number) => {
		if (!fileInputRef.current) return;

		const files = Array.from(fileInputRef.current.files || []);

		const updatedFiles = files.filter((_, i) => i !== index);

		const dataTransfer = new DataTransfer();
		updatedFiles.forEach((file) => dataTransfer.items.add(file));

		fileInputRef.current.files = dataTransfer.files;

		setUploadedImages((prev) => prev.filter((_, i) => i !== index));

		setValue("images", updatedFiles, {
			shouldValidate: true,
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
			<div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#0d1b2a] p-6 shadow-xl text-white">
				<h2 className="text-center text-lg font-bold mb-6">
					افزودن محصول جدید
				</h2>

				<div className="space-y-10">
					<div className="relative">
						<label className="block mb-1 text-sm">نام محصول</label>
						<input
							type="name"
							{...register("name")}
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="نام محصول"
						/>
						{errors.name && (
							<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
								{errors.name.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<label className="block mb-1 text-sm">قیمت</label>
							<input
								type="number"
								{...register("price", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 "
								placeholder="قیمت"
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.currentTarget; // استفاده از currentTarget به جای target
									if (input.value.length > 1 && input.value.startsWith("0")) {
										input.value = input.value.replace(/^0+/, "");
									}
								}}
							/>
							{errors.price && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.price.message}
								</p>
							)}
						</div>

						<div className="relative">
							<label className="block mb-1 text-sm">موجودی</label>
							<input
								type="number"
								{...register("stock", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="موجودی"
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.currentTarget; // استفاده از currentTarget به جای target
									if (input.value.length > 1 && input.value.startsWith("0")) {
										input.value = input.value.replace(/^0+/, "");
									}
								}}
							/>
							{errors.stock && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative">
							<label className="block mb-1 text-sm">برند</label>
							<input
								type="brand"
								{...register("brand")}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="برند"
							/>
							{errors.brand && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.brand.message}
								</p>
							)}
						</div>

						<div className="relative">
							<label className="block mb-1 text-sm">دسته بندی</label>

							<select
								{...register("category")}
								defaultValue="" // پیشفرض خالی
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="" disabled>
									یک دسته‌بندی انتخاب کنید
								</option>
								<option value="سدان">سدان</option>
								<option value="کانورتیبل">کانورتیبل</option>
								<option value="کوپه">کوپه</option>
								<option value="شاسی بلند">شاسی بلند</option>
							</select>

							{errors.category && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.category.message}
								</p>
							)}
						</div>
					</div>

					<div className="relative">
						<label className="block mb-1 text-sm">توضیحات</label>

						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<ProductEditor
									value={field.value || ""}
									onChange={(value) => {
										setValue("description", value, {
											shouldValidate: true,
											shouldDirty: true,
										});
									}}
								/>
							)}
						/>
						{errors.description && (
							<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
								{errors.description.message}
							</p>
						)}
					</div>

					<div>
						<div className="relative">
							<input
								type="file"
								multiple
								ref={fileInputRef}
								onChange={handleImageChange}
								className=" w-full
    text-sm
    text-gray-300
    bg-[#1b263b]
    border border-gray-600
    rounded-lg
    cursor-pointer
    file:mr-4
    file:py-2
    file:px-4
    file:rounded-md
    file:border-0
    file:text-sm
    file:font-medium
    file:bg-blue-600
    file:text-white
    hover:file:bg-blue-700"
							/>

							{errors.images && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-[-18]">
									{errors.images.message}
								</p>
							)}
						</div>

						<div className="flex flex-wrap gap-3 mt-3">
							{uploadedImages.map((img, index) => (
								<div
									key={index}
									className="w-20 h-20 rounded-md overflow-hidden border border-gray-600 relative"
								>
									<img
										src={img}
										alt="preview"
										className="w-full h-full object-cover"
									/>
									<button
										type="button"
										onClick={() => handleRemoveImage(index)}
										className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-bl"
									>
										✕
									</button>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="flex justify-between mt-6">
					<button
						className="px-4 py-2 bg-gray-500 rounded-md"
						onClick={() => setOpenAddModal(false)}
					>
						انصراف
					</button>

					<button
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
						onClick={handleSubmit(submit)}
					>
						افزودن محصول
					</button>
				</div>
			</div>
		</div>
	);
}
