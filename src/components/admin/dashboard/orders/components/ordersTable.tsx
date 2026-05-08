"use client";
import Loading from "@/shared/loading";
import { Orders } from "@/types/productTypeAndOrders";
import { useState } from "react";
import OrderDetailsModal from "./orderDetail";
interface ProductTableProps {
	error: any;
	isLoading: boolean;
	data: any;

	orders: Orders[];
}

function OrdersTable({ error, isLoading, data, orders }: ProductTableProps) {
	const [openOrderModal, setOpenOrderModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<any>(null);

	return (
		<>
			{openOrderModal && (
				<OrderDetailsModal
					openOrderModal={openOrderModal}
					setOpenOrderModal={setOpenOrderModal}
					order={selectedOrder}
				/>
			)}
			<div
				className={`table-div mt-4  w-full h-full max-h-full  bg-tertialy px-3   overflow-y-auto lg:overflow-x-hidden   ${error && "flex justify-center items-center bg-tertialy/70"} ${isLoading && "bg-tertialy/30 flex justify-center items-center"} vertical-scroll-rtl width-scroll
    `}
			>
				{error && (
					<div className=" flex flex-col items-center justify-center gap-8 ">
						<p className="text-red-500 font-bold text-xl text-center">
							متاسفانه در دریافت اطلاعات مشکلی پیش آمده
						</p>
						<button
							className="px-4 py-2 bg-tertialy text-white rounded-lg hover:bg-white hover:text-tertaly transition"
							onClick={() => {
								window.location.reload();
							}}
						>
							تلاش دوباره
						</button>
					</div>
				)}
				{isLoading && (
					<div className="flex flex-col items-center justify-center animate-pulse">
						<div className="text-tertialy font-bold text-2xl">
							در حال بارگزاری اطلاعات
						</div>
						<Loading />
					</div>
				)}

				{data && (
					<table className="w-full min-w-250 lg:min-w-0 border-separate border-spacing-y-4 text-center ">
						<thead className="sticky top-0 bg-[#1F2A40] z-20">
							<tr>
								<th className="p-4 text-white font-bold">ردیف</th>
								<th className="p-4 text-white font-bold">نام مشتری</th>
								<th className="p-4 text-white font-bold">محصول</th>
								<th className="p-4 text-white font-bold">تعداد</th>
								<th className="p-4 text-white font-bold">آدرس</th>
								<th className="p-4 text-white font-bold">تاریخ اضافه شدن</th>

								<th className="p-4 text-white font-bold">وضعیت سفارش</th>

								<th className="p-4 text-white font-bold min-w-30">عملیات</th>
							</tr>
						</thead>

						<tbody>
							{orders.map((item, index: number) => (
								<tr
									key={item._id}
									className="bg-[#2A3B55] hover:bg-[#32466A] transition-colors group"
								>
									<td className="p-4 text-white rounded-r-xl whitespace-nowrap">
										{index + 1}
									</td>

									<td className="p-4">
										<div className="flex justify-center text-white">
											{item.user.name}
										</div>
									</td>

									<td className="p-4 text-white whitespace-nowrap">
										{item.orderItems[0]?.name}
									</td>
									<td className="p-4 text-white whitespace-nowrap">
										{item.orderItems[0]?.quantity}
									</td>
									<td className="p-4 text-white whitespace-nowrap">
										{item.shippingAddress.address}
									</td>
									<td className="p-4 text-white whitespace-nowrap">
										{new Date(item.updatedAt).toLocaleDateString("fa-IR")}
									</td>
									<td className="p-4 text-white font-mono">{item.status}</td>
									<td
										className="p-4  font-mono text-secondry hover:cursor-pointer "
										onClick={() => {
											setSelectedOrder(item);
											setOpenOrderModal(true);
										}}
									>
										جزعیات سفارش
									</td>

									{/* <td className="p-4 text-white rounded-l-xl min-w-30"></td> */}
								</tr>
							))}
						</tbody>
						<tfoot></tfoot>
					</table>
				)}
			</div>
		</>
	);
}

export default OrdersTable;
