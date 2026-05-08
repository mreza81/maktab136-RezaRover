"use client";

export default function EditProductModal({
	openEdditModal,
	setOpenEdditModal,
}: {
	openEdditModal: boolean;
	setOpenEdditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	if (!openEdditModal) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d1b2a] p-6 shadow-xl text-white">
				<h1 className="text-center text-xl font-bold mb-6">ویرایش محصول</h1>

				<div className="space-y-5">
					<div>
						<label className="block mb-1 text-sm">نام</label>
						<input className="w-full bg-[#1b263b] px-3 py-2 rounded-md" />
					</div>

					<div>
						<label className="block mb-1 text-sm">توضیحات</label>
						<textarea
							rows={3}
							className="w-full bg-[#1b263b] px-3 py-2 rounded-md"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block mb-1 text-sm">قیمت</label>
							<input className="w-full bg-[#1b263b] px-3 py-2 rounded-md" />
						</div>

						<div>
							<label className="block mb-1 text-sm">برند</label>
							<input className="w-full bg-[#1b263b] px-3 py-2 rounded-md" />
						</div>
					</div>

					<div>
						<label className="block mb-1 text-sm">تصاویر</label>
						<div className="w-full bg-[#1b263b] p-5 rounded-md border border-dashed border-gray-500 text-center">
							آپلود تصویر جدید
						</div>

						<div className="flex gap-3 mt-4">
							<div className="w-20 h-20 bg-[#1b263b] rounded-md"></div>
							<div className="w-20 h-20 bg-[#1b263b] rounded-md"></div>
						</div>
					</div>

					<div className="flex justify-between pt-5">
						<button
							onClick={() => setOpenEdditModal(false)}
							className="px-4 py-2 bg-gray-500 rounded-md"
						>
							انصراف
						</button>

						<button className="px-4 py-2 bg-blue-600 rounded-md">
							ذخیره تغییرات
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
