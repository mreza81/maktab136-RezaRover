"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProduct } from "../services/deleteProduct.service";

export default function DeleteProductModal({
	openDeleteModal,
	setOpenDeleteModal,
	productId,
	setProductId,
}: {
	openDeleteModal: boolean;
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;

	productId: string;
	setProductId: React.Dispatch<React.SetStateAction<string>>;
}) {
	const queryClient = useQueryClient();
	const handleDeleteProduct = async (productId: string) => {
		try {
			const res = await deleteProduct(productId);
			if (res) {
				toast.success("محصول با موفقیت حذف شد");
				queryClient.invalidateQueries({ queryKey: ["products"] });

				setOpenDeleteModal(false);
			}
		} catch (error: any) {
			toast.error("خطا در حذف محصول");
			setOpenDeleteModal(false);
		}
	};

	if (!openDeleteModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="w-full max-w-md rounded-2xl bg-[#0d1b2a] p-6 shadow-xl text-white">
				<h1 className="text-center text-xl font-bold mb-4">حذف محصول</h1>

				<p className="text-center text-gray-300 mb-6">
					آیا از حذف این محصول مطمئن هستید؟
				</p>

				<div className="flex justify-between">
					<button
						onClick={() => setOpenDeleteModal(false)}
						className="px-4 py-2 bg-gray-500 rounded-md"
					>
						انصراف
					</button>

					<button
						className="px-4 py-2 bg-red-600 rounded-md"
						onClick={() => {
							handleDeleteProduct(productId);
						}}
					>
						حذف محصول
					</button>
				</div>
			</div>
		</div>
	);
}
