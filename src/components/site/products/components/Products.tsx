import Breadcrumb from "@/shared/breadcrump";
import FilterAndSortDivMobile from "./filterAndSortDivMobile";
import FilterSidebar from "./filterSideBarLaptop";
import SortSelect from "./selectSort";

async function Products() {
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
				<div className="products-parent w-full my-5  h-screen px-5  lg:my-10">
					<div className="w-full h-full bg-red-500"></div>
				</div>
			</div>
		</div>
	);
}

export default Products;
