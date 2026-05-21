"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterSidebar() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const clearFilters = () => {
		router.push("/products"); // یا هر روتی که این فیلتر سایدبار روی آن هست
	};

	// استیت‌های محلی برای نگهداری فیلترهای انتخاب شده قبل از اعمال نهایی

	const handleFilterBrand = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		// مقدار فعلی این فیلتر از URL، مثل "سدان,شاسی‌بلند"
		const currentValues = params.get(key)?.split(",") || [];

		// اگر از قبل انتخاب شده بود → حذفش کن (toggle)
		if (currentValues.includes(value)) {
			const newValues = currentValues.filter((i) => i !== value);
			if (newValues.length > 0) {
				params.set(key, newValues.join(","));
			} else {
				params.delete(key);
			}
		} else {
			// اگر نبود → اضافه‌اش کن
			currentValues.push(value);
			params.set(key, currentValues.join(","));
		}
		// 📍 آدرس جدید را با فیلترها بروزرسانی کن (بدون رفرش کامل صفحه)
		router.push(`?${params.toString()}`);
	};

	const handleFilterCategory = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		// اگر همان مقدار قبلاً انتخاب شده بود → حذف فیلتر (toggle)
		if (params.get(key) === value) {
			params.delete(key);
		} else {
			// در غیر این‌صورت فقط همین مقدار را تنظیم کن (تک انتخابی)
			params.set(key, value);
		}

		// بروزرسانی URL
		router.push(`?${params.toString()}`);
	};

	const categoryClasses = ["سدان", "شاسی بلند", "کوپه", "کانورتیبل"];
	const brands = [
		"بی ام و",
		"بنز",
		"پورشه",
		"مازراتی",
		"تویوتا",
		"هیوندا",
		"کیا",
		"لکسوس",
		"نیسان",
	];

	const priceRanges = [
		{ label: "تا 30,000 دلار", value: "0-30000" },
		{ label: "از 30,000 تا 70,000 دلار", value: "30000-70000" },
		{ label: "از 70,000 تا 100,000 دلار", value: "70000-100000" },
		{ label: "بیش از 100,000 دلار", value: "100000+" },
	];

	const [openSections, setOpenSections] = useState({
		category: true,
		brand: true,
	});

	const toggleSection = (section: "category" | "brand") => {
		setOpenSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	return (
		<aside className="w-full max-w-50 xl:max-w-72.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm my-10 hidden lg:block mr-5 sticky top-5  self-start">
			{/* Header */}
			<div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
				<div className="flex items-center gap-2">
					<SlidersHorizontal size={18} className="text-primary" />
					<h2 className="text-sm font-bold text-gray-800">فیلترها</h2>
				</div>

				<button
					className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-red-500"
					onClick={clearFilters}
				>
					<X size={14} />
					حذف همه
				</button>
			</div>

			{/* کلاس بدنه */}
			<div className="border-b border-gray-100 py-3">
				<button
					onClick={() => toggleSection("category")}
					className="flex w-full items-center justify-between"
				>
					<span className="text-sm font-semibold text-gray-800">کلاس بدنه</span>

					<ChevronDown
						size={18}
						className={`text-gray-500 transition-transform duration-300 ${
							openSections.category ? "rotate-180" : ""
						}`}
					/>
				</button>

				<div
					className={`grid transition-all duration-300 ${
						openSections.category
							? "grid-rows-[1fr] opacity-100 mt-3"
							: "grid-rows-[0fr] opacity-0 mt-0"
					}`}
				>
					<div className="overflow-hidden">
						<div className="space-y-2">
							{categoryClasses.map((item) => (
								<label
									key={item}
									className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
								>
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											// خواندن وضعیت از URL:
											checked={(
												searchParams.get("category")?.split(",") || []
											).includes(item)}
											className="h-4 w-4 accent-primary"
											onChange={() => handleFilterCategory("category", item)}
										/>

										<span>{item}</span>
									</div>
									{(searchParams.get("category")?.split(",") || []).includes(
										item,
									) && <span className="text-xs text-primary">انتخاب شد</span>}
								</label>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* برند */}
			<div className="border-b border-gray-100 py-3">
				<button
					onClick={() => toggleSection("brand")}
					className="flex w-full items-center justify-between"
				>
					<span className="text-sm font-semibold text-gray-800">برند</span>

					<ChevronDown
						size={18}
						className={`text-gray-500 transition-transform duration-300 ${
							openSections.brand ? "rotate-180" : ""
						}`}
					/>
				</button>

				<div
					className={`grid transition-all duration-300 ${
						openSections.brand
							? "grid-rows-[1fr] opacity-100 mt-3"
							: "grid-rows-[0fr] opacity-0 mt-0"
					}`}
				>
					<div className="overflow-hidden">
						<div className="space-y-2">
							{brands.map((item) => (
								<label
									key={item}
									className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
								>
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={(
												searchParams.get("brand")?.split(",") || []
											).includes(item)}
											className="h-4 w-4 accent-primary"
											onChange={() => handleFilterBrand("brand", item)}
										/>
										<span>{item}</span>
									</div>
									{(searchParams.get("brand")?.split(",") || []).includes(
										item,
									) && <span className="text-xs text-primary">انتخاب شد</span>}
								</label>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* بازه قیمت */}
			{/* <div className="py-3">
				<button
					onClick={() => toggleSection("price")}
					className="flex w-full items-center justify-between"
				>
					<span className="text-sm font-semibold text-gray-800">بازه قیمت</span>

					<ChevronDown
						size={18}
						className={`text-gray-500 transition-transform duration-300 ${
							openSections.price ? "rotate-180" : ""
						}`}
					/>
				</button>

				<div
					className={`grid transition-all duration-300 ${
						openSections.price
							? "grid-rows-[1fr] opacity-100 mt-3"
							: "grid-rows-[0fr] opacity-0 mt-0"
					}`}
				>
					<div className="overflow-hidden">
						<div className="space-y-2">
							{priceRanges.map((item) => (
								<label
									key={item.value}
									className="flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
								>
									<div className="flex items-center gap-2">
										<input
											type="radio"
											name="price"
											checked={selectedPrice === item.value}
											className="h-4 w-4 accent-primary"
											onChange={() => setSelectedPrice(item.value)}
										/>
										<span>{item.label}</span>
									</div>

									{selectedPrice === item.value && (
										<span className="text-xs text-primary">فعال</span>
									)}
								</label>
							))}
						</div>
					</div>
				</div>
			</div> */}

			{/* Footer */}
			{/* <div className="mt-4 border-t border-gray-100 pt-4"></div> */}
		</aside>
	);
}
