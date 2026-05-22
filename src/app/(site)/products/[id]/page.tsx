import SingleProduct from "@/components/site/single-product/components/SingleProduct";
import React from "react";

function page({ params }: { params: { id: string } }) {
	return <SingleProduct params={params} />;
}

export default page;
