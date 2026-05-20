import Breadcrumb from "@/shared/breadcrump";
import FilterAndSortDivMobile from "./filterAndSortDivMobile";
import FilterSidebar from "./filterSideBarLaptop";

function Products() {
	return (
		<div className="w-full ">
			<div className="w-full h-20 lg:h-25 bg-secondry"></div>
			<div className="w-full pr-6">
				<Breadcrumb />
			</div>
			<FilterAndSortDivMobile />
			<FilterSidebar />
		</div>
	);
}

export default Products;
