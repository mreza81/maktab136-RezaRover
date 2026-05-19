"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./BlogCard";

function HomeSwiperWeblog() {
	const slides = [
		{
			image: "/assets/images/نمایندگی-فروش-خودروهای-ارس-پلاک-در-تبریز.webp",
			title: "نمایندگی فروش خودروهای ارس پلاک در تبریز",
			href: "https://salarkhodro.com/%d9%86%d9%85%d8%a7%db%8c%d9%86%d8%af%da%af%db%8c-%d9%81%d8%b1%d9%88%d8%b4-%d8%ae%d9%88%d8%af%d8%b1%d9%88%d9%87%d8%a7%db%8c-%d8%a7%d8%b1%d8%b3-%d9%be%d9%84%d8%a7%da%a9-%d8%af%d8%b1-%d8%aa%d8%a8%d8%b1/",
		},
		{
			image: "/assets/images/فروش-اقساطی-خودرو-ارس-پلاک-1024x576.webp",
			title: "فروش اقساطی خودرو ارس پلاک",
			href: "https://salarkhodro.com/%d9%81%d8%b1%d9%88%d8%b4-%d8%a7%d9%82%d8%b3%d8%a7%d8%b7%db%8c-%d8%ae%d9%88%d8%af%d8%b1%d9%88-%d8%a7%d8%b1%d8%b3-%d9%be%d9%84%d8%a7%da%a9/",
		},
		{
			image:
				"/assets/images/پلاک-موقت-منطقه-آزاد-ارس؛-هر-آنچه-باید-بدانید-1024x576.webp",
			title: "پلاک موقت منطقه آزاد ارس",
			href: "https://salarkhodro.com/%d9%be%d9%84%d8%a7%da%a9-%d9%85%d9%88%d9%82%d8%aa-%d9%85%d9%86%d8%b7%d9%82%d9%87-%d8%a2%d8%b2%d8%a7%d8%af-%d8%a7%d8%b1%d8%b3%d8%9b-%d9%87%d8%b1-%d8%a2%d9%86%da%86%d9%87-%d8%a8%d8%a7%db%8c%d8%af-%d8%a8/",
		},
		{
			image: "/assets/images/آیا-خودرو-های-ارس،-پلاک-میشوند؟-1024x576.webp",
			title: "آیا خودروهای ارس پلاک می‌شوند؟",
			href: "https://salarkhodro.com/%d8%a2%db%8c%d8%a7-%d8%ae%d9%88%d8%af%d8%b1%d9%88-%d9%87%d8%a7%db%8c-%d8%a7%d8%b1%d8%b3%d8%8c-%d9%be%d9%84%d8%a7%da%a9-%d9%85%db%8c%d8%b4%d9%88%d9%86%d8%af%d8%9f/",
		},
	];
	const loopSlides = [...slides, ...slides];

	return (
		<div className=" mt-10 w-full">
			<div className="w-full text-center text-primary text-2xl md:text-4xl lg:text-5xl font-bold">
				وبلاگ رضاروور
			</div>
			<div className="my-10  max-w-400 mx-auto px-5">
				<Swiper
					modules={[Autoplay, Pagination]} // اضافه کردن ماژول پیجینیشن
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
							slidesPerView: 1,
						},
						640: {
							slidesPerView: 2,
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
					{loopSlides.map((item, index) => (
						<SwiperSlide key={index}>
							<BlogCard
								image={item.image}
								title={item.title}
								href={item.href}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

export default HomeSwiperWeblog;
