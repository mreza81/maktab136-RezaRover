import React from "react";

export default function AboutUs() {
	return (
		<div className="w-full bg-gray-50 text-gray-800 antialiased">
			<div className="w-full h-20 lg:h-25 bg-secondry "></div>
			{/* ۱. بخش مدیریت و معرفی شرکت (بالای صفحه) */}
			<section className="py-16 md:py-24 bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						{/* ستون متن و توضیحات (الان سمت چپ در دسکتاپ) */}
						<div className="lg:col-span-6 space-y-6 order-1 text-right">
							<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
								واردات خودرو به سادگی هر چه بیشتر
							</h1>

							<div className="space-y-4 text-gray-600 leading-relaxed text-justify lg:text-right">
								<p>
									شرکت <span className="font-bold text-gray-900">رضاروور</span>{" "}
									به مدیریت{" "}
									<span className="font-bold text-gray-900">
										محمدرضا دهقانی
									</span>{" "}
									یکی از فعالان شناخته‌شده در حوزه{" "}
									<span className="font-semibold text-gray-900">
										واردات و عرضه خودروهای خارجی در منطقه آزاد ارس
									</span>{" "}
									است. فعالیت اصلی این مجموعه بر پایه{" "}
									<span className="font-semibold text-gray-900">
										تأمین خودروهای روز دنیا
									</span>{" "}
									از برندهای ژاپنی، کره‌ای و اروپایی و ارائه آن‌ها با{" "}
									<span className="font-semibold text-gray-900">پلاک ارس</span>{" "}
									انجام می‌شود. روند کاری شرکت معمولاً از مرحله انتخاب و سفارش
									خودرو شروع می‌شود؛ جایی که بر اساس نیاز مشتری، خودرو از
									مسیرهای قانونی منطقه آزاد یا از تأمین‌کنندگان معتبر این ناحیه
									وارد می‌شود. سپس مراحل گمرکی، استانداردسازی و اخذ پلاک منطقه
									آزاد زیر نظر مجموعه پیگیری شده و خودرو آماده تحویل می‌گردد.
								</p>

								<p>
									تمرکز شرکت بر خودروهای صفر و کم‌کار، سالم و قابل ردیابی است تا
									مشتری بتواند با اطمینان بیشتری خرید کند. از طرفی، به دلیل
									ماهیت منطقه آزاد، این مجموعه دسترسی سریع‌تری به مدل‌های جدید و
									دگرگون‌پذیر با استانداردهای روز دارد که وارداتشان به سرزمین
									اصلی محدود یا کند است؛ همین موضوع باعث می‌شود رضاروور در بازار
									خودروهای ارس‌پلاک، گزینه‌های متنوع و به‌روزتری نسبت به بسیاری
									از نمایشگاه‌های معمولی ارائه دهد.
								</p>
							</div>
						</div>

						{/* ستون تصویر مدیریت (الان سمت راست در دسکتاپ) */}
						<div className="lg:col-span-6 flex justify-center order-2">
							<div className="relative w-full max-w-md aspect-4/3 lg:aspect-square bg-gray-100 rounded-4xl shadow-xl overflow-hidden border border-gray-100">
								{/* آدرس عکس خالی است تا بعداً جایگذاری کنید */}
								<img
									src="/assets/images/IMG_20251229_235229_838.webp"
									alt="مدیریت رضاروور"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ۲. بخش ماشین (پایین صفحه - پس‌زمینه تیره و تمام‌صفحه) */}
			<section className="relative h-[78vh] min-h-120 w-full bg-slate-900 overflow-hidden flex items-center justify-center ">
				{/* تصویر خودروی پس‌زمینه (آدرس خالی است) */}
				<img
					src="/assets/images/about.webp"
					alt="خودروی وارداتی رضاروور"
					className="absolute inset-0 w-full h-full object-cover object-center opacity-40 select-none pointer-events-none"
				/>
				{/* افکت تیره برای خوانایی بهتر متن روی تصویر */}
				<div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-black/85"></div>

				{/* محتوای وسط هدر ماشین */}
				<div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
					<h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
						رضاروور،پلاک ملی
					</h2>
					<p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
						رضاروور یکی از شرکت‌های معتبر واردکننده خودرو در ایران است که به‌طور
						تخصصی خودروهای پلاک ملی را وارد کشور می‌کند. این شرکت با هدف ارائه
						خودروهایی با کیفیت بالا و مطابق با استانداردهای جهانی، به‌ویژه در
						حوزه خودروهای تجاری و سواری، در بازار ایران فعالیت می‌کند. رضاروور
						با پشتیبانی از خدمات پس از فروش و ارائه قطعات یدکی اصلی، به یکی از
						گزینه‌های قابل اعتماد برای خریداران ایرانی تبدیل شده است.
					</p>
				</div>
			</section>
		</div>
	);
}
