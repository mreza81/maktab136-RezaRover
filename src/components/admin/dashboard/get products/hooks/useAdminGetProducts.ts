"use client";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../services/dashProducts.service";

export function useAdminGetProducts(
	page: number,
	limit: number,
	search: string,
) {
	const { data, error, isLoading } = useQuery({
		queryKey: ["products", page, limit, search],
		queryFn: () => getProducts(page, limit, search),
	});

	return { data, error, isLoading };
}
