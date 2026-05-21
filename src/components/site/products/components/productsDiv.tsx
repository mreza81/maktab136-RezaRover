import { getProducts } from "@/api/getProducts/getProducts.service";
import ProductCard from "@/shared/ProductCard";
import { ProductType } from "@/types/productTypeAndOrders";
import NoResults from "./emptyList";

export default async function ProductList({
	searchParams,
}: {
	searchParams: any;
}) {
	const params = await searchParams;
	const brand = params.brand || "";
	const search = params.search || "";
	const category = params.category || "";
	const limit = Number(params.limit) || 10;
	const page = Number(params.page) || 1;

	const res = await getProducts(brand, search, category, page, limit);
	const products = res.data;
	if (!products || products.length === 0) {
		return <NoResults />;
	}

	return (
		<div className="products-parent w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.map((item: ProductType) => (
				<ProductCard key={item._id} type="productPage" item={item} />
			))}
		</div>
	);
}
