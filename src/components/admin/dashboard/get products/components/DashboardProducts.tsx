"use client";
import Sidebar from "@/layout/adminLayout/sidebar";
import Image from "next/image";
import { getProducts } from "../services/dashProducts.service";
import { useEffect, useState } from "react";

function DashboardProducts() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(100);
	const [search, setSearch] = useState("");

	useEffect(() => {
		getProducts(page, limit, search);
	}, []);
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
					<div className="hidden md:flex  bg-tertialy w-82 h-12 rounded-xl  md:justify-start md:items-center gap-4 focus-within:border-3 border-secondry  xl:h-15 xl:w-88 xl:gap-9">
						<input
							className="  p-2 text-white w-65 h-12 rounded-r-xl outline-none"
							placeholder="محصول مورد نظر را جست و جو کنید"
						/>
						<Image
							src="/assets/images/search.png"
							alt="سرج"
							width={40}
							height={35}
							className="rounded-xl object-cover shadow-lg border hover:cursor-pointer "
						/>
					</div>
					<div className="add-btn p-2 flex justify-center items-center w-17 h-12 rounded-xl text-white bg-tertialy hover:bg-secondry hover:text-white hover:cursor-pointer  xl:w-74 lg:h-15 lg:justify-between lg:items-center ">
						<div className="text-md font-semibold hidden xl:block">
							اضافه کردن محصول
						</div>
						<div className="text-2xl font-semibold  hidden xl:block">|</div>
						<div className="text-2xl font-semibold ">+</div>
					</div>
				</div>
				<div className="table-div mt-10  w-full h-full bg-tertialy overflow-x-scroll  pt-5 ">
					<table className="min-w-225 lg:min-w-full lg:max-w-[225] overflow-x-scroll bg-black ">
						<thead>
							<tr className="px-3 py-5  ">
								<td className="text-white  text-lg">ردیف</td>
								<td className="text-white font-semiold text-lg">عکس محصول</td>

								<td className="text-white font-semibold text-lg">برند</td>
								<td className="text-white font-semibold text-lg">مدل</td>
								<td className="text-white font-semibold text-lg">کلاس بدنه</td>
								<td className="text-white font-semibold text-lg">
									تاریخ اضافه شدن
								</td>
								<td className="text-white font-semibold text-lg">تعداد</td>
								<td className="text-white font-semibold text-lg">عملیات</td>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default DashboardProducts;
