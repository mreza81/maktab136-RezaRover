import { getProducts } from "@/api/getProducts/getProducts.service";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(
	brand: string,
	search: string,
	category: string,
	page: number,
	limit: number,
) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["products", brand, search, category, page, limit],
		queryFn: () => getProducts(brand, search, category, page, limit),
	});

	return { data, error, isLoading };
}
