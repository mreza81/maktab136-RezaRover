import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/getOrders.services";

export function useAdminGetOrders(page: number, limit: number, status: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["orders", page, limit, status],
		queryFn: () => getOrders(page, limit, status),
	});
	return { data, isLoading, error };
}
