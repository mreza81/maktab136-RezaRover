"use client";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/dashProducts.service";

export function useAdminGetProducts(
	page: number,
	limit: number,
	debouncedSearch: string,
) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["products", page, limit, debouncedSearch],
		queryFn: () => getProducts(page, limit, debouncedSearch),
	});

	return { data, error, isLoading };
}
