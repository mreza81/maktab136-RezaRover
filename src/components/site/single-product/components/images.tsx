"use client";
import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { ProductType } from "@/types/productTypeAndOrders";

import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Images({ product }: { product: ProductType }) {
	const [selectedImage, setSelectedImage] = useState(
		`${BASE_URL}${product.images[0]}`,
	);
	return (
		<div className="flex flex-col justify-center items-center   ">
			<div className="big-img w-full h-75 md:h-90 xl:h-90 bg-gray-200 ">
				<img
					className="w-full h-full bg-contain md:rounded-md border border-secondry object-cover"
					src={selectedImage}
				/>
			</div>
			<div className="w-full mt-3 grid  gap-3 px-2 md:px-0 ">
				<Swiper
					modules={[Autoplay]} // اضافه کردن ماژول پیجینیشن
					loop={true} // لوپ بی‌نهایت
					slidesPerGroup={1}
					speed={900}
					spaceBetween={18}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
					}}
					// برای نداشتن نویگیشن، کافیست ماژول Navigation را اضافه نکنید
					breakpoints={{
						0: {
							slidesPerView: 4,
						},
						640: {
							slidesPerView: 3,
						},
						1024: {
							slidesPerView: 3,
						},
						1280: {
							slidesPerView: 4, // در حالت دسکتاپ (از ۱۲۸۰ پیکسل به بالا) ۴ تا نمایش می‌دهد
						},
					}}
					className="w-full pb-10" // اضافه کردن padding-bottom برای اینکه نقاط پیجینیشن روی کارت‌ها نیفتند
				>
					{product.images.map((item: string, index) => {
						return (
							<SwiperSlide key={index}>
								<img
									src={`${BASE_URL}${item}`}
									alt="عکس محصول"
									className="min-w-23 h-23  w-full rounded-md cursor-pointer border border-secondry hover:scale-105 transition"
									onClick={() => setSelectedImage(`${BASE_URL}${item}`)}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
	<div></div>;
}

export default Images;
