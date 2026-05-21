import { getProducts } from "@/api/getProducts/getProducts.service";
import Breadcrumb from "@/shared/breadcrump";
import ProductCard from "@/shared/ProductCard";
import { ProductType } from "@/types/productTypeAndOrders";
import FilterAndSortDivMobile from "./filterAndSortDivMobile";
import FilterSidebar from "./filterSideBarLaptop";
import SortSelect from "./selectSort";
type ProductsPageProps = {
	searchParams: Promise<{
		brand?: string;
		search?: string;
		category?: string;
		limit?: number;
		page?: number;
	}>;
};
async function Products({ searchParams }: ProductsPageProps) {
	const params = await searchParams;
	const brand = params.brand || "";
	const search = params.search || "";
	const category = params.category || "";
	const limit = Number(params.limit) || 100;
	const page = Number(params.page) || 1;

	const res = await getProducts(brand, search, category, page, limit);
	const products = res.data;

	return (
		<div className="w-full  ">
			<div className="w-full h-20 lg:h-25 bg-secondry "></div>
			<div className="select-and-breadcrump-parent w-full px-6  flex justify-between items-center mt-5 ">
				<div className="">
					<Breadcrumb />
				</div>
				<div>
					<SortSelect />
				</div>
			</div>
			<div className="flex flex-col lg:flex-row ">
				<FilterAndSortDivMobile />
				<FilterSidebar />
				<div className=" w-full my-5  px-5  lg:my-10   ">
					<div className="products-parent w-full   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  ">
						{products.map((item: ProductType) => {
							return (
								<ProductCard key={item._id} type="productPage" item={item} />
							);
						})}
					</div>
					<div className="pagination-div w-full  bg-blue-400 "></div>
				</div>
			</div>
		</div>
	);
}

export default Products;
