import Products from "@/components/site/products/components/Products";
type ProductsPageProps = {
	searchParams: {
		brand?: string;
		search?: string;
		category?: string;
		limit?: number;
		page?: number;
	};
};
function page({ searchParams }: ProductsPageProps) {
	return (
		<div>
			<Products searchParams={searchParams} />
		</div>
	);
}

export default page;
