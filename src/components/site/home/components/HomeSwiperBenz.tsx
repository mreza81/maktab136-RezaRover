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
		<div className="mt-30 mb-30 flex flex-col lg:flex-row justify-center items-center lg:items-end gap-10 lg:gap-0 mx-auto">
			{/* slider */}
			<div className="h-full w-[96vw] md:w-[70vw] lg:w-[43vw] xl:w-[25vw] lg:bg-black">
				{isLoading && (
					<div className="flex flex-col items-center justify-center animate-pulse">
						<div className="text-tertialy font-bold text-2xl">
							در حال بارگزاری اطلاعات
						</div>
						<Loading />
					</div>
				)}

				{error && (
					<div className="flex flex-col items-center justify-center gap-8">
						<p className="text-red-500 font-bold text-xl text-center">
							متاسفانه در دریافت اطلاعات مشکلی پیش آمده
						</p>

						<button
							className="px-4 py-2 bg-tertialy text-white rounded-lg"
							onClick={() => window.location.reload()}
						>
							تلاش دوباره
						</button>
					</div>
				)}

				<Swiper
					modules={[Navigation, Autoplay]}
					slidesPerView={1}
					spaceBetween={20}
					loop
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					onBeforeInit={(swiper) => {
						if (typeof swiper.params.navigation !== "boolean") {
							swiper.params.navigation!.prevEl = prevRef.current;
							swiper.params.navigation!.nextEl = nextRef.current;
						}
					}}
				>
					{products.map((item: ProductType) => (
						<SwiperSlide key={item._id}>
							<div className="bg-white rounded-xl shadow-md border border-primary/30 p-4 flex flex-col gap-4">
								<div className="flex gap-4 items-center">
									<img
										src={`${BASE_URL}${item.images?.[0]}`}
										alt="عکس"
										className="w-26 h-26 rounded-lg shadow-md object-fill"
									/>

									<div className="flex flex-col gap-4 w-full">
										<div className="flex justify-between">
											<div className="text-gray-500">مدل</div>
											<div className="font-semibold">{item.name}</div>
										</div>

										<div className="flex justify-between">
											<div className="text-gray-500">بدنه</div>
											<div className="font-semibold">{item.category}</div>
										</div>

										<div className="flex justify-between">
											<div className="text-gray-500">قیمت</div>
											<div className="font-semibold text-primary">
												{item.price}$
											</div>
										</div>
									</div>
								</div>

								<div className="border-t border-gray-200"></div>

								<div className="flex justify-end">
									<button className="px-4 py-2 rounded-lg bg-primary text-white">
										مشاهده &gt;
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* buttons */}
				<div className="flex justify-center items-center gap-4 mt-5">
					<button
						ref={prevRef}
						className="bg-primary text-white px-4 py-2 rounded-lg"
					>
						قبلی
					</button>

					<button
						ref={nextRef}
						className="bg-primary text-white px-4 py-2 rounded-lg"
					>
						بعدی
					</button>
				</div>
			</div>
		</div>
	);
}

export default HomeSwiperBenz;
