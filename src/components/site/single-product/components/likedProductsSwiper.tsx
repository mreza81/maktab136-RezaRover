"use client";

import ProductCard from "@/shared/ProductCard";
import { useEffect } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {
	likedProductsData: any[];
};

function LikedProductsSwiper({ likedProductsData }: Props) {
	useEffect(() => {
		console.log(likedProductsData);
	}, []);
	return (
		<div className="w-full rounded-xl bg- shadow-sm border border-gray-200 bg-[#F5F3FF] p-6 h-full ">
			<div className="w-full mx-auto  flex justify-center items-center">
				<h3 className="text-xl font-bold text-primary mb-4">محصولات مشابه</h3>
			</div>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={19}
				slidesPerView={1.2}
				loop={true}
				autoplay={{
					delay: 4500,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				breakpoints={{
					640: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
			>
				{likedProductsData?.map((product: any) => (
					<SwiperSlide key={product._id}>
						<ProductCard item={product} type="inLikedItems" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default LikedProductsSwiper;
