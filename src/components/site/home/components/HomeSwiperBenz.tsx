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

import ProductCard from "@/shared/ProductCard";

function HomeSwiperBenz() {
	const { data, isLoading, error } = useGetProducts("بنز", "", "", 1, 100);

	const products = data?.data ?? [];

	const prevRef = useRef<HTMLButtonElement | null>(null);
	const nextRef = useRef<HTMLButtonElement | null>(null);

	return (
		<section className="w-full px-3 lg:px-6 mt-24 mb-24 overflow-hidden">
			<div className="max-w-400 mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
				<div className="relative w-full lg:w-95 xl:w-105 bg-black rounded-3xl overflow-hidden flex flex-col justify-center items-center lg:justify-between p-6 lg:p-8 min-h-105 xl:h-180">
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
							className="w-full max-w-90 object-contain drop-shadow-[0_20px_30px_rgba(255,255,255,0.15)] hidden lg:block"
						/>
					</div>
				</div>

				<div className="w-full lg:flex-1 bg-[#f7f7f9] rounded-3xl p-4 sm:p-6 lg:p-6 overflow-hidden min-h-105 xl:h-180">
					{isLoading && (
						<div className="flex flex-col justify-center items-center h-full gap-5">
							<p className="text-2xl font-bold text-violet-700">
								در حال بارگذاری اطلاعات
							</p>

							<Loading />
						</div>
					)}

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
								onSwiper={(swiper) => {
									setTimeout(() => {
										if (
											swiper.params.navigation &&
											typeof swiper.params.navigation !== "boolean"
										) {
											swiper.params.navigation.prevEl = prevRef.current;
											swiper.params.navigation.nextEl = nextRef.current;
										}

										swiper.navigation.destroy();
										swiper.navigation.init();
										swiper.navigation.update();
									});
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
									<SwiperSlide key={item._id} className="h-auto!">
										<ProductCard type={"swiper"} item={item} />
									</SwiperSlide>
								))}
							</Swiper>

							<div className="flex justify-center items-center gap-4 mt-8 lg:mt-15  flex-wrap">
								<button
									ref={prevRef}
									className="bg-black hover:bg-neutral-800 transition-all duration-300 text-white px-5 py-2.5 rounded-xl font-semibold min-w-27.5 hover:cursor-pointer"
								>
									قبلی
								</button>

								<button
									ref={nextRef}
									className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-700/20 min-w-27.5 hover:cursor-pointer"
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
