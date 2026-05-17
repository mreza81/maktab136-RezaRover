"use client";

import { addProductScheema, AddProductScheemaType } from "@/scheema/addProduct";
import ProductEditor from "@/shared/TextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const submit = async (data: AddProductScheemaType) => {
		try {
			const res = await handleAddProduct(data);
			if (res) {
				toast.success("محصول با موفقیت اضافه شد");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
			<div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#0d1b2a] p-6 shadow-xl text-white">
				<h2 className="text-center text-lg font-bold mb-6">
					افزودن محصول جدید
				</h2>

				<div className="space-y-7">
					<div>
						<label className="block mb-1 text-sm">نام محصول</label>
						<input
							type="name"
							{...register("name")}
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="نام محصول"
						/>
						{errors.name && (
							<p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block mb-1 text-sm">قیمت</label>
							<input
								type="number"
								{...register("price", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="قیمت"
							/>
							{errors.price && (
								<p className="text-red-400 text-xs mt-1">
									{errors.price.message}
								</p>
							)}
						</div>

						<div>
							<label className="block mb-1 text-sm">موجودی</label>
							<input
								type="number"
								{...register("stock", { valueAsNumber: true })}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="موجودی"
							/>
							{errors.stock && (
								<p className="text-red-400 text-xs mt-1">
									{errors.stock.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block mb-1 text-sm">برند</label>
							<input
								type="brand"
								{...register("brand")}
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="برند"
							/>
							{errors.brand && (
								<p className="text-red-400 text-xs mt-1">
									{errors.brand.message}
								</p>
							)}
						</div>

						<div>
							<label className="block mb-1 text-sm">دسته بندی</label>

							<select
								{...register("category")}
								defaultValue="" // پیشفرض خالی
								className="w-full bg-[#1b263b] px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="" disabled>
									یک دسته‌بندی انتخاب کنید
								</option>
								<option value="sedan">سدان</option>
								<option value="convertible">کانورتیبل</option>
								<option value="coupe">کوپه</option>
								<option value="suv">شاسی بلند</option>
							</select>

							{errors.category && (
								<p className="text-red-400 text-xs mt-1">
									{errors.category.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label className="block mb-1 text-sm">توضیحات</label>

						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<ProductEditor
									value={field.value || ""}
									onChange={field.onChange}
								/>
							)}
						/>
						{errors.description && (
							<p className="text-red-400 text-xs mt-1">
								{errors.description.message}
							</p>
						)}
					</div>

					<div>
						<label className="block mb-1 text-sm">تصاویر محصول</label>

						<div className="border border-dashed border-gray-500 bg-[#1b263b] rounded-md p-6 text-center text-gray-400 cursor-pointer">
							انتخاب تصاویر
						</div>

						<div className="flex gap-2 mt-3">
							<div className="w-14 h-14 bg-[#1b263b] rounded"></div>
							<div className="w-14 h-14 bg-[#1b263b] rounded"></div>
							<div className="w-14 h-14 bg-[#1b263b] rounded"></div>
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
