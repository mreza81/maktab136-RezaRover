"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterModal({
	openFilter,
	setOpenFilter,
}: {
	openFilter: boolean;
	setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const clearFilters = () => {
		router.push("/products");
	};

	const handleFilterBrand = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const currentValues = params.get(key)?.split(",") || [];

		if (currentValues.includes(value)) {
			const newValues = currentValues.filter((i) => i !== value);
			if (newValues.length > 0) {
				params.set(key, newValues.join(","));
			} else {
				params.delete(key);
			}
		} else {
			currentValues.push(value);
			params.set(key, currentValues.join(","));
		}

		router.push(`?${params.toString()}`);
	};

	const handleFilterCategory = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get(key) === value) {
			params.delete(key);
		} else {
			params.set(key, value);
		}

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
		<>
			{/* Overlay */}
			<div
				onClick={() => setOpenFilter(false)}
				className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
					openFilter ? "opacity-100 visible" : "opacity-0 invisible"
				}`}
			/>

			{/* Drawer */}
			<aside
				className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transition-transform duration-300 ${
					openFilter ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex h-full flex-col p-4 overflow-y-auto">
					{/* Header */}
					<div className="mb-4 flex items-center justify-between border-b pb-3">
						<div className="flex items-center gap-2">
							<SlidersHorizontal size={18} className="text-primary" />
							<h2 className="text-sm font-bold text-gray-800">فیلترها</h2>
						</div>

						<button onClick={() => setOpenFilter(false)}>
							<X size={20} />
						</button>
					</div>

					{/* حذف همه */}
					<button
						onClick={clearFilters}
						className="mb-4 text-xs text-red-500 flex items-center gap-1"
					>
						<X size={14} />
						حذف همه فیلترها
					</button>

					{/* کلاس بدنه */}
					<div className="border-b py-3">
						<button
							onClick={() => toggleSection("category")}
							className="flex w-full items-center justify-between"
						>
							<span className="text-sm font-semibold">کلاس بدنه</span>

							<ChevronDown
								size={18}
								className={`transition ${
									openSections.category ? "rotate-180" : ""
								}`}
							/>
						</button>

						{openSections.category && (
							<div className="space-y-2 mt-3">
								{categoryClasses.map((item) => (
									<label
										key={item}
										className="flex items-center justify-between text-sm"
									>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={(
													searchParams.get("category")?.split(",") || []
												).includes(item)}
												onChange={() => handleFilterCategory("category", item)}
											/>
											<span>{item}</span>
										</div>
									</label>
								))}
							</div>
						)}
					</div>

					{/* برند */}
					<div className="py-3">
						<button
							onClick={() => toggleSection("brand")}
							className="flex w-full items-center justify-between"
						>
							<span className="text-sm font-semibold">برند</span>

							<ChevronDown
								size={18}
								className={`transition ${
									openSections.brand ? "rotate-180" : ""
								}`}
							/>
						</button>

						{openSections.brand && (
							<div className="space-y-2 mt-3">
								{brands.map((item) => (
									<label
										key={item}
										className="flex items-center justify-between text-sm"
									>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												checked={(
													searchParams.get("brand")?.split(",") || []
												).includes(item)}
												onChange={() => handleFilterBrand("brand", item)}
											/>
											<span>{item}</span>
										</div>
									</label>
								))}
							</div>
						)}
					</div>
				</div>
			</aside>
		</>
	);
}
