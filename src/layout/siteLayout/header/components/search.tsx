"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function Search() {
	const [search, setSearch] = useState("");
	const [debouncedSearch] = useDebounce(search, 700);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		// ۱. فقط زمانی که debouncedSearch تغییر کرد، URL را آپدیت کن
		const params = new URLSearchParams(searchParams.toString());

		if (debouncedSearch) {
			params.set("search", debouncedSearch);
		} else {
			params.delete("search");
		}

		// ۲. برای جلوگیری از ری‌رندر اضافی، فقط در صورتی push کن که URL واقعاً تغییر کرده باشد
		const newPath = `/products?${params.toString()}`;
		if (window.location.search !== newPath) {
			router.push(newPath);
		}

		// ۳. searchParams را از لیست وابستگی‌ها حذف کردیم تا لوپ ایجاد نشود
	}, [debouncedSearch, router]);
	return (
		<div className="relative w-43 sm:w-72 md:w-96 lg:w-56 xl:w-90 ">
			<input
				type="text"
				placeholder="جستجو در خودروها..."
				className="w-full h-12 lg:h-13 pr-12 pl-5 text-sm sm:text-base lg:text-lg rounded-2xl border border-white/40 bg-transparent text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-300"
				onChange={(e) => {
					setSearch(e.target.value);
				}}
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
