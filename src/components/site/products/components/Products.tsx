import { getProducts } from "@/api/getProducts/getProducts.service";
import Breadcrumb from "@/shared/breadcrump";
import ProductCard from "@/shared/ProductCard";
import { ProductType } from "@/types/productTypeAndOrders";

import FilterAndSortDivMobile from "./filterAndSortDivMobile";
import FilterSidebar from "./filterSideBarLaptop";
import SortSelect from "./selectSort";
import { Suspense } from "react";
import ProductCardSkeleton from "@/shared/ProductCardSkeleton";
import ProductList from "./productsDiv";
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
				<FilterAndSortDivMobile />
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
					<div className="pagination-div w-full  bg-blue-400 "></div>
				</div>
			</div>
		</div>
	);
}

export default Products;
