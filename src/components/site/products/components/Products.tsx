import Breadcrumb from "@/shared/breadcrump";
import React from "react";

function Products() {
	return (
		<div className="w-full h-screen">
			<div className="w-full h-20 lg:h-25 bg-secondry"></div>
			<div className="mr-5">
				<Breadcrumb />
			</div>
		</div>
	);
}

export default Products;
