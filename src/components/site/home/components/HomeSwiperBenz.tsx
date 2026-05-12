"use client";

import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { useGetProducts } from "@/hooks/useGetProducts";
import Loading from "@/shared/loading";
import { ProductType } from "@/types/productTypeAndOrders";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

function HomeSwiperBenz() {
	const { data, isLoading, error } = useGetProducts("بنز", "", "", 1, 100);

	const products = data?.data ?? [];

	const prevRef = useRef<HTMLButtonElement | null>(null);
	const nextRef = useRef<HTMLButtonElement | null>(null);

	return (
		<section className="w-full px-3 lg:px-6 mt-24 mb-24 overflow-hidden">
			<div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
				{/* RIGHT SIDE */}
				<div className="relative w-full lg:w-[380px] xl:w-[420px] bg-black rounded-3xl overflow-hidden flex flex-col justify-center items-center lg:justify-between p-6 lg:p-8 min-h-[420px]">
					{/* BLUR */}
					<div className="absolute -top-24 -right-24 w-72 h-72 bg-violet-700/20 blur-3xl rounded-full" />

					<div className="relative z-10 flex flex-col gap-8">
						<Image
							src="/assets/images/Mercedes-Logo.svg.png"
							alt="Mercedes Logo"
							width={90}
							height={90}
							className="object-contain"
						/>

						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-3">
								<h2 className="text-white text-3xl lg:text-4xl font-black leading-[1.7] flex items-center gap-2 flex-wrap">
									<span>خرید خودروهای</span>

									<span className="text-violet-400">بنز</span>
								</h2>

								<p className="text-gray-400 leading-8 text-sm lg:text-base">
									جدیدترین مدل‌های مرسدس بنز با طراحی مدرن، عملکرد فوق‌العاده و
									تجربه‌ای لوکس از رانندگی.
								</p>
							</div>

							<Link
								href=""
								className="w-fit bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-violet-700/20"
							>
								مشاهده همه خودروها
							</Link>
						</div>
					</div>

					<div className="relative z-10 mt-10 flex justify-center">
						<Image
							src="/assets/images/benz-nb.png"
							alt="benz"
							width={1000}
							height={1000}
							className="w-full max-w-[360px] object-contain drop-shadow-[0_20px_30px_rgba(255,255,255,0.15)] hidden lg:block"
						/>
					</div>
				</div>

				{/* LEFT SIDE */}
				<div className="w-full lg:flex-1 bg-[#f7f7f9] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-4 sm:p-6 lg:p-6 overflow-hidden min-h-[420px]">
					{/* LOADING */}
					{isLoading && (
						<div className="flex flex-col justify-center items-center h-full gap-5">
							<p className="text-2xl font-bold text-violet-700">
								در حال بارگذاری اطلاعات
							</p>

							<Loading />
						</div>
					)}

					{/* ERROR */}
					{error && (
						<div className="flex flex-col justify-center items-center h-full gap-6">
							<p className="text-red-500 font-bold text-lg text-center">
								متاسفانه مشکلی در دریافت اطلاعات به وجود آمده
							</p>

							<button
								onClick={() => window.location.reload()}
								className="bg-violet-600 hover:bg-violet-700 transition text-white px-5 py-2 rounded-xl"
							>
								تلاش دوباره
							</button>
						</div>
					)}

					{/* SWIPER */}
					{!isLoading && !error && (
						<>
							<Swiper
								modules={[Navigation, Autoplay]}
								loop={products.length > 2}
								speed={900}
								spaceBetween={18}
								autoplay={{
									delay: 3500,
									disableOnInteraction: false,
								}}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								onBeforeInit={(swiper) => {
									if (
										typeof swiper.params.navigation !== "boolean" &&
										swiper.params.navigation
									) {
										swiper.params.navigation.prevEl = prevRef.current;

										swiper.params.navigation.nextEl = nextRef.current;
									}
								}}
								breakpoints={{
									0: {
										slidesPerView: 1,
									},

									640: {
										slidesPerView: 1,
									},

									1024: {
										slidesPerView: 2,
									},

									1400: {
										slidesPerView: 2,
									},
								}}
								className="w-full"
							>
								{products.map((item: ProductType) => (
									<SwiperSlide key={item._id} className="!h-auto">
										<div className="bg-white border border-black/5 rounded-3xl p-4 lg:p-4 xl:p-5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-4 w-full min-h-[360px] lg:min-h-[460px]">
											{/* IMAGE */}
											<div className="w-full flex justify-center">
												<img
													src={`${BASE_URL}${item.images?.[0]}`}
													alt={item.name}
													className="w-32 h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-fill rounded-2xl bg-gray-100 p-3 shadow-sm"
												/>
											</div>

											{/* CONTENT */}
											<div className="flex flex-col gap-4">
												<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
													<span className="text-gray-500 text-sm">
														مدل خودرو
													</span>

													<span className="font-black text-black text-sm lg:text-base text-left">
														{item.name}
													</span>
												</div>

												<div className="flex justify-between items-center border-b border-gray-200 pb-3 gap-3">
													<span className="text-gray-500 text-sm">
														دسته‌بندی
													</span>

													<span className="font-semibold text-black text-sm">
														{item.category}
													</span>
												</div>

												<div className="flex justify-between items-center gap-3">
													<span className="text-gray-500 text-sm">قیمت</span>

													<span className="font-black text-violet-700 text-base lg:text-xl">
														{item.price}$
													</span>
												</div>
											</div>

											{/* FOOTER */}
											<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 mt-auto">
												<div className="flex items-center gap-2 text-sm text-gray-500">
													<div className="w-2 h-2 rounded-full bg-green-500" />

													<span>موجود در انبار</span>
												</div>

												<button className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-700/20 w-full sm:w-fit text-sm">
													مشاهده جزئیات
												</button>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							{/* NAVIGATION */}
							<div className="flex justify-center items-center gap-4 mt-8 lg:mt-40 flex-wrap">
								<button
									ref={prevRef}
									className="bg-black hover:bg-neutral-800 transition-all duration-300 text-white px-5 py-2.5 rounded-xl font-semibold min-w-[110px]"
								>
									قبلی
								</button>

								<button
									ref={nextRef}
									className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-700/20 min-w-[110px]"
								>
									بعدی
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default HomeSwiperBenz;
