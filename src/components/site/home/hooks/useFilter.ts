"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const handleFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		// اگر کاربر در صفحه محصولات نیست، اول به صفحه محصولات برو
		const newPath =
			pathname === "/products"
				? `${pathname}?${params.toString()}`
				: `/products?${params.toString()}`;

		router.push(newPath);
	};

	return { handleFilter };
}
