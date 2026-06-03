"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletCart } from "../services/deleteCart.service";
import { useRouter } from "next/navigation";

function ClearAllButton() {
	const [openModal, setOpenModal] = useState(false);
	const router = useRouter();
	const handleClearAll = async () => {
		await deletCart();

		toast.success("🎉سبد خرید با موفقیت حذف شد");
		router.refresh();
	};
	return (
		<div>
			<button
				className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all text-sm font-medium cursor-pointer"
				onClick={() => {
					setOpenModal(true);
				}}
			>
				<Trash2 size={18} />
				<span>حذف همه</span>
			</button>
			{openModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
					<div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
						{/* آیکون */}
						<div className="mx-auto w-16 h-16 bg-purple-50 flex items-center justify-center rounded-full mb-4">
							<Trash2 className="text-purple-600" size={32} />
						</div>

						{/* متن */}
						<p className="text-gray-800 font-bold text-lg mb-8">
							آیا از حذف سبد خرید مطمئنید؟
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
								onClick={() => handleClearAll()}
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

export default ClearAllButton;
