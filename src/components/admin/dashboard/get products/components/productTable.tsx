"use client";
import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import Loading from "@/shared/loading";
import { ProductType } from "@/types/productType";
import { useState } from "react";
interface ProductTableProps {
	error: any;
	isLoading: boolean;
	data: any;
	products: any;
}

function ProductTable({ error, isLoading, data, products }: ProductTableProps) {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	return (
		<div
			className={`table-div mt-10  w-full h-full max-h-full  bg-tertialy px-3   overflow-y-auto lg:overflow-x-hidden   ${error && "flex justify-center items-center bg-tertialy/70"} ${isLoading && "bg-tertialy/30 flex justify-center items-center"} vertical-scroll-rtl width-scroll
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
							<th className="p-4 text-white font-bold">عکس محصول</th>
							<th className="p-4 text-white font-bold">برند</th>
							<th className="p-4 text-white font-bold">مدل</th>
							<th className="p-4 text-white font-bold">کلاس بدنه</th>
							<th className="p-4 text-white font-bold">تاریخ اضافه شدن</th>
							<th className="p-4 text-white font-bold">تعداد</th>
							<th className="p-4 text-white font-bold min-w-30">عملیات</th>
						</tr>
					</thead>

					<tbody>
						{products.map((item: ProductType, index: number) => (
							<tr
								key={item._id}
								className="bg-[#2A3B55] hover:bg-[#32466A] transition-colors group"
							>
								<td className="p-4 text-white rounded-r-xl whitespace-nowrap">
									{index + 1}
								</td>

								<td className="p-4">
									<div className="flex justify-center">
										<img
											src={`${BASE_URL}${item.images?.[0]}`}
											alt="عکس"
											className="w-16 h-16 object-cover rounded-lg shadow-md"
										/>
									</div>
								</td>

								<td className="p-4 text-white whitespace-nowrap">
									{item.brand}
								</td>
								<td className="p-4 text-white whitespace-nowrap">
									{item.name}
								</td>
								<td className="p-4 text-white whitespace-nowrap">
									{item.category}
								</td>
								<td className="p-4 text-white whitespace-nowrap">
									{new Date(item.createdAt).toLocaleDateString("fa-IR")}
								</td>
								<td className="p-4 text-white font-mono">{item.stock}</td>

								<td className="p-4 text-white rounded-l-xl min-w-30">
									<div className="bg-blue-600/20 py-2 rounded-lg flex justify-center items-center gap-4">
										<img
											src="/assets/images/pen3.png"
											alt="ادیت"
											className="w-10 h-10 object-contain hover:cursor-pointer"
											onClick={() => {
												setOpenEditModal(true);
											}}
										/>
										<img
											src="/assets/images/trash.png"
											alt="حذف"
											className="w-10 h-10 object-contain hover:cursor-pointer"
											onClick={() => {
												setOpenDeleteModal(true);
											}}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot></tfoot>
				</table>
			)}
		</div>
	);
}

export default ProductTable;
