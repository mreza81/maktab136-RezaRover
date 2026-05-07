"use client";
import Sidebar from "@/layout/adminLayout/sidebar";
import Image from "next/image";

import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import Loading from "@/shared/loading";
import { ProductType } from "@/types/productType";
import { useState } from "react";
import { useAdminGetProducts } from "../hooks/useAdminGetProducts";

function DashboardProducts() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(100);
	const [search, setSearch] = useState("");

	const { data, error, isLoading } = useAdminGetProducts(page, limit, search);
	const products = data?.data || [];
	const total = data?.total || 0;
	const totalPages = Math.ceil(total / limit);

	return (
		<div className="  w-full bg-white min-h-[calc(100vh-80px)] lg:flex  lg:flex-row  gap-4 p-6 mx-auto">
			<Sidebar />

			<div className=" h-[80vh] w-full mt-5 flex flex-col justify-start items-start">
				<div className="add-and-search-buttons flex justify-between items-center w-full ">
					<div className="search-btn p-2 flex justify-center items-center w-17 h-12 rounded-xl bg-tertialy md:hidden">
						<Image
							src="/assets/images/search.png"
							alt="سرج"
							width={40}
							height={35}
							className="rounded-xl object-cover shadow-lg border  "
						/>
					</div>
					<div className="hidden md:flex  bg-tertialy w-82 h-12 rounded-xl  md:justify-start md:items-center gap-4 focus-within:border-3 border-secondry  xl:h-15 xl:w-85 px-3">
						<input
							className="  p-2 text-white w-65 h-12 rounded-r-xl outline-none"
							placeholder="محصول مورد نظر را جست و جو کنید"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Image
							src="/assets/images/search.png"
							alt="سرج"
							width={40}
							height={35}
							className="rounded-xl object-cover shadow-lg border hover:cursor-pointer "
							// onClick={() => setSearch(searchValue)}
						/>
					</div>
					<div className="add-btn flex justify-center items-center w-17 h-12 rounded-xl text-white bg-tertialy hover:bg-secondry hover:text-white hover:cursor-pointer px-3 xl:justify-between xl:w-74 xl:h-15 lg:justify-center lg:items-center ">
						<div className="text-md font-semibold hidden xl:block">
							اضافه کردن محصول
						</div>
						<div className="text-2xl font-semibold  hidden xl:block">|</div>
						<div className="text-2xl font-semibold  ">+</div>
					</div>
				</div>

				<div
					className={`table-div mt-10  w-full h-full max-h-full  bg-tertialy px-3   overflow-y-auto lg:overflow-x-hidden   ${error && "flex justify-center items-center bg-tertialy/70"} ${isLoading && "bg-tertialy/30 flex justify-center items-center"} vertical-scroll-rtl
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
												/>
												<img
													src="/assets/images/trash.png"
													alt="حذف"
													className="w-10 h-10 object-contain hover:cursor-pointer"
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
				<div className="w-full mt-4 py-3 flex justify-center bg-tertialy">
					<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap">
						{/* limit selector */}
						<div className="flex items-center gap-2 text-sm">
							{/* <span className="hidden sm:inline text-white">تعداد:</span> */}
							<select
								value={limit}
								onChange={(e) => {
									setLimit(Number(e.target.value));
									setPage(1);
								}}
								className="border rounded border-white text-white px-2 py-1 text-sm outline-none"
							>
								<option className="text-black" value={10}>
									10
								</option>
								<option className="text-black" value={20}>
									20
								</option>
								<option className="text-black" value={50}>
									50
								</option>
								<option className="text-black" value={100}>
									100
								</option>
							</select>
						</div>

						{/* prev */}
						<button
							disabled={page === 1}
							onClick={() => setPage((p) => p - 1)}
							className="px-3 py-1 text-sm bg-gray-300 text-tertialy rounded disabled:opacity-40 hover:bg-secondry hover:text-white transition"
						>
							قبلی
						</button>

						{/* pages */}
						<div className="flex gap-1 flex-wrap justify-center max-w-full overflow-x-auto">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
								<button
									key={p}
									onClick={() => setPage(p)}
									className={`px-3 py-1 text-sm rounded whitespace-nowrap ${
										page === p
											? "bg-secondry text-white"
											: "bg-gray-300 text-black"
									}`}
								>
									{p}
								</button>
							))}
						</div>

						{/* next */}
						<button
							disabled={page === totalPages}
							onClick={() => setPage((p) => p + 1)}
							className="px-3 py-1 text-sm  bg-gray-300 text-tertialy hover:bg-secondry hover:text-white transition rounded disabled:opacity-40"
						>
							بعدی
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardProducts;
