import Breadcrumb from "@/shared/breadcrump";

import { getProducts } from "@/api/getProducts/getProducts.service";
import ProductCardSkeleton from "@/shared/ProductCardSkeleton";
import { Suspense } from "react";
import FilterAndSortDivMobile from "./filterAndSortDivMobile";
import FilterSidebar from "./filterSideBarLaptop";
import Pagination from "./pagination";
import ProductList from "./productsDiv";
import SortSelect from "./selectSort";
type ProductsPageProps = {
	searchParams: {
		brand?: string;
		search?: string;
		category?: string;
		limit?: number;
		page?: number;
	};
};

async function Products({ searchParams }: ProductsPageProps) {
	const params = await searchParams;
	const brand = params.brand || "";
	const search = params.search || "";
	const category = params.category || "";
	const limit = Number(params.limit) || 10;
	const page = Number(params.page) || 1;
	const res = await getProducts(brand, search, category, page, limit);
	const total = res.total;
	const currentPage = res.page;
	const totalPages = Math.ceil(total / limit);

	return (
		<div className="w-full  ">
			<div className="w-full h-20 lg:h-25 bg-secondry "></div>
			<div className="select-and-breadcrump-parent w-full px-6  flex justify-between items-center mt-5 ">
				<div className="">
					<Suspense fallback={null}>
						<Breadcrumb />
					</Suspense>
				</div>
				<div>
					<SortSelect />
				</div>
			</div>
			<div className="flex flex-col lg:flex-row ">
				<Suspense fallback={null}>
					<FilterAndSortDivMobile />
				</Suspense>
				<Suspense fallback={null}>
					<FilterSidebar />
				</Suspense>
				<div className=" w-full my-5  px-5  lg:my-10   ">
					<Suspense
						fallback={
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{Array.from({ length: 10 }).map((_, i) => (
									<ProductCardSkeleton key={i} type="productPage" />
								))}
							</div>
						}
					>
						<ProductList searchParams={searchParams} />
					</Suspense>
					<div className="pagination-div w-full">
						<Suspense fallback={null}>
							<Pagination totalPages={totalPages} currentPage={currentPage} />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;
