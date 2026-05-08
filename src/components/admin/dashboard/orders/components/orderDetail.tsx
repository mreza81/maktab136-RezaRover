"use client";

export default function OrderDetailsModal({
	openOrderModal,
	setOpenOrderModal,
	order,
	onStatusChange,
}: {
	openOrderModal: boolean;
	setOpenOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
	order: any;
	onStatusChange?: () => void;
}) {
	if (!openOrderModal) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d1b2a] p-7 shadow-xl text-white">
				<h1 className="text-center text-2xl font-bold mb-8">جزئیات سفارش</h1>

				<div className="space-y-6">
					<div>
						<label className="block mb-1 text-sm">نام مشتری</label>
						<div className="bg-[#1b263b] p-3 rounded-md">
							{order?.shippingAddress?.name ?? "—"}
						</div>
					</div>

					<div>
						<label className="block mb-1 text-sm">شماره تماس</label>
						<div className="bg-[#1b263b] p-3 rounded-md">
							{order?.shippingAddress?.phone ?? "—"}
						</div>
					</div>

					<div className="flex justify-between pt-5">
						<button
							onClick={() => setOpenOrderModal(false)}
							className="px-4 py-2 bg-gray-500 rounded-md"
						>
							بستن
						</button>

						<button
							onClick={onStatusChange}
							className="px-4 py-2 bg-green-600 rounded-md"
						>
							تغییر وضعیت سفارش
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
