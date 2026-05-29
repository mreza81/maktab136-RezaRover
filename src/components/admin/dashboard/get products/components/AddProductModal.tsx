"use client";

import { addProductScheema, AddProductScheemaType } from "@/scheema/addProduct";
import ProductEditor from "@/shared/TextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleAddProduct } from "../services/addProduct.service";

type PreviewImage = {
	file: File;
	preview: string;
};

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
		reset,
		formState: { errors, isSubmitting },
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
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [uploadedImages, setUploadedImages] = useState<PreviewImage[]>([]);

	const cleanupPreviews = (images: PreviewImage[]) => {
		images.forEach((item) => {
			if (item.preview) {
				URL.revokeObjectURL(item.preview);
			}
		});
	};

	const closeModal = () => {
		cleanupPreviews(uploadedImages);
		setUploadedImages([]);
		reset();
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
		setOpenAddModal(false);
	};

	useEffect(() => {
		if (!openAddModal) {
			cleanupPreviews(uploadedImages);
			setUploadedImages([]);
			reset();
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openAddModal]);

	useEffect(() => {
		return () => {
			cleanupPreviews(uploadedImages);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		const newFilesArray = Array.from(files);
		const previousFiles = getValues("images") || [];
		const updatedFiles = [...previousFiles, ...newFilesArray];

		setValue("images", updatedFiles, {
			shouldValidate: true,
			shouldDirty: true,
		});

		const newPreviewItems: PreviewImage[] = newFilesArray.map((file) => ({
			file,
			preview: URL.createObjectURL(file),
		}));

		setUploadedImages((prev) => [...prev, ...newPreviewItems]);

		// برای اینکه کاربر بتواند دوباره همان فایل را هم انتخاب کند
		e.target.value = "";
	};

	const handleRemoveImage = (index: number) => {
		const currentFiles = getValues("images") || [];
		const updatedFiles = currentFiles.filter((_, i) => i !== index);

		const removedImage = uploadedImages[index];
		if (removedImage?.preview) {
			URL.revokeObjectURL(removedImage.preview);
		}

		setUploadedImages((prev) => prev.filter((_, i) => i !== index));

		setValue("images", updatedFiles, {
			shouldValidate: true,
			shouldDirty: true,
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const submit = async (data: AddProductScheemaType) => {
		try {
			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("price", String(data.price));
			formData.append("stock", String(data.stock));
			formData.append("category", data.category);
			formData.append("brand", data.brand);

			if (data.images && data.images.length > 0) {
				data.images.forEach((file) => {
					formData.append("images", file);
				});
			}

			const res = await handleAddProduct(formData);

			if (res) {
				toast.success("محصول با موفقیت اضافه شد");
				queryClient.invalidateQueries({ queryKey: ["products"] });
				closeModal();
			}
		} catch (error: any) {
			const message =
				error?.response?.data?.message || error?.message || "خطایی رخ داد";
			toast.error(message);
		}
	};

	if (!openAddModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
			<div className="w-full max-w-xl h-[90vh] rounded-lg bg-[#0d1b2a] text-white shadow-xl flex flex-col overflow-hidden">
				{/* Header */}
				<div className="shrink-0 px-6 py-4 border-b border-white/10">
					<h2 className="text-center text-lg font-bold">افزودن محصول جدید</h2>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 vertical-scroll-rtl">
					<div className="relative pb-5">
						<label className="block mb-1 text-sm">نام محصول</label>
						<input
							type="text"
							{...register("name")}
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="نام محصول"
						/>
						{errors.name && (
							<p className="text-red-400 text-xs mt-1 absolute bottom-0">
								{errors.name.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative pb-5">
							<label className="block mb-1 text-sm">قیمت</label>
							<input
								type="number"
								{...register("price", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="قیمت"
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.currentTarget;
									if (input.value.length > 1 && input.value.startsWith("0")) {
										input.value = input.value.replace(/^0+/, "");
									}
								}}
							/>
							{errors.price && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-0">
									{errors.price.message}
								</p>
							)}
						</div>

						<div className="relative pb-5">
							<label className="block mb-1 text-sm">موجودی</label>
							<input
								type="number"
								{...register("stock", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="موجودی"
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.currentTarget;
									if (input.value.length > 1 && input.value.startsWith("0")) {
										input.value = input.value.replace(/^0+/, "");
									}
								}}
							/>
							{errors.stock && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-0">
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="relative pb-5">
							<label className="block mb-1 text-sm">برند</label>
							<input
								type="text"
								{...register("brand")}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="برند"
							/>
							{errors.brand && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-0">
									{errors.brand.message}
								</p>
							)}
						</div>

						<div className="relative pb-5">
							<label className="block mb-1 text-sm">دسته بندی</label>
							<select
								{...register("category")}
								defaultValue=""
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
								<p className="text-red-400 text-xs mt-1 absolute bottom-0">
									{errors.category.message}
								</p>
							)}
						</div>
					</div>

					<div className="relative pb-5">
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
							<p className="text-red-400 text-xs mt-1 absolute bottom-0">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="pb-2">
						<div className="relative pb-5">
							<input
								type="file"
								multiple
								accept="image/*"
								ref={fileInputRef}
								onChange={handleImageChange}
								className="w-full text-sm text-gray-300 bg-[#1b263b] border border-gray-600 rounded-lg cursor-pointer
								file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
								file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
							/>
							{errors.images && (
								<p className="text-red-400 text-xs mt-1 absolute bottom-0">
									{errors.images.message as string}
								</p>
							)}
						</div>

						<div className="mt-2 rounded-lg border border-white/10 bg-[#1b263b] p-3 h-36 overflow-y-auto vertical-scroll-rtl ">
							{uploadedImages.length > 0 ? (
								<div className="flex flex-wrap gap-3">
									{uploadedImages.map((item, index) => (
										<div
											key={`${item.file.name}-${index}`}
											className="w-20 h-20 rounded-md overflow-hidden border border-gray-600 relative shrink-0"
										>
											<img
												src={item.preview}
												alt={`preview-${index}`}
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
							) : (
								<div className="h-full flex items-center justify-center text-sm text-gray-400">
									هنوز عکسی انتخاب نشده
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="shrink-0 border-t border-white/10 px-6 py-4 bg-[#0d1b2a]">
					<div className="flex justify-between gap-3">
						<button
							type="button"
							className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600 transition"
							onClick={closeModal}
						>
							انصراف
						</button>

						<button
							type="button"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={handleSubmit(submit)}
							disabled={isSubmitting}
						>
							{isSubmitting ? "در حال ثبت..." : "افزودن محصول"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
