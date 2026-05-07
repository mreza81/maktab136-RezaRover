"use client";
import Sidebar from "@/layout/adminLayout/sidebar";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import { useAdminGetProducts } from "../hooks/useAdminGetProducts";
import ProductTable from "./productTable";

function DashboardProducts() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 700);
	const [openEditModal, setOpenEditModal] = useState(false);
	const { data, error, isLoading } = useAdminGetProducts(
		page,
		limit,
		debouncedSearch,
	);
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
					<div className="hidden md:flex  bg-tertialy w-82 h-12 rounded-xl  md:justify-start md:items-center gap-4 focus-within:border-3 border-secondry   xl:h-15 xl:w-88 px-3">
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
						/>
					</div>
					{/* <div className="text-tertialy text-2xl">صفحه محصولات</div> */}

					<div className="add-btn flex justify-center items-center w-17 h-12 rounded-xl  text-white bg-tertialy hover:bg-secondry hover:text-white hover:cursor-pointer px-3 xl:justify-between xl:w-74 xl:h-15  lg:justify-center lg:items-center ">
						<div className="text-md font-semibold hidden xl:block">
							اضافه کردن محصول
						</div>
						<div className="text-2xl font-semibold  hidden xl:block">|</div>
						<div className="text-2xl font-semibold  ">+</div>
					</div>
				</div>

				<ProductTable
					error={error}
					isLoading={isLoading}
					data={data}
					products={products}
				/>
				<div className="w-full mt-4 py-3 flex justify-center bg-tertialy rounded-b-xl">
					<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-wrap">
						<div className="flex items-center gap-2 text-sm">
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

						<button
							disabled={page === 1}
							onClick={() => setPage((p) => p - 1)}
							className="px-3 py-1 text-sm bg-gray-300 text-tertialy rounded disabled:opacity-40 hover:bg-secondry hover:text-white transition"
						>
							قبلی
						</button>

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
