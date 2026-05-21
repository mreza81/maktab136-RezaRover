"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [search, setSearch] = useState(searchParams.get("search") || "");

	const debounced = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set("search", value);
		} else {
			params.delete("search");
		}

		router.replace(`/products?${params.toString()}`);
	}, 700);

	const handleSearch = (value: string) => {
		setSearch(value);
		debounced(value);
	};

	useEffect(() => {
		if (pathname !== "/products") {
			setSearch("");
		}
	}, [pathname]);

	return (
		<div className="relative w-43 sm:w-72 md:w-96 lg:w-56 xl:w-90">
			<input
				type="text"
				value={search}
				placeholder="جستجو در خودروها..."
				className="w-full h-12 lg:h-13 pr-12 pl-5 text-sm sm:text-base lg:text-lg rounded-2xl border border-white/40 bg-transparent text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-300"
				onChange={(e) => handleSearch(e.target.value)}
			/>

			<img
				src="/assets/images/search.png"
				alt="search"
				className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 opacity-90"
			/>
		</div>
	);
}

export default Search;
