function Footer() {
	return (
		<footer className="w-full bg-secondry px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-10 flex justify-center">
			<div className="w-full max-w-7xl flex flex-col gap-14">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="flex flex-col gap-2 max-w-md">
						<h3 className="text-white text-xl font-semibold">رضاروور</h3>

						<p className="text-white/80 leading-7 text-sm md:text-base">
							شرکت رضاروور آریا که در سال ۱۳۸۶ با شماره ثبت ۴۴۶۳۰۶ تاسیس شده یکی
							از شرکت های فعال در زمینه فروش خودرو در ایران می باشد. این مجموعه
							با سال ها تجربه در زمینه فروش نقدی و اقساطی خودرو فعالیت دارد و
							همواره تلاش کرده بهترین خدمات را به مشتریان ارائه دهد.
						</p>
					</div>

					<div className="flex flex-col gap-6">
						<h3 className="text-white text-xl font-semibold">
							شعب و نمایندگی ها
						</h3>

						<div className="flex gap-3 items-start">
							<img
								src="/assets/images/location.png"
								className="w-5 h-5 mt-1"
								alt="location"
							/>
							<p className="text-white/80 text-sm md:text-base">
								تهران، سعادت آباد، میدان کاج، برج پایدار، واحد 702
							</p>
						</div>

						<div className="flex gap-3 items-start">
							<img
								src="/assets/images/location.png"
								className="w-5 h-5 mt-1"
								alt="location"
							/>
							<p className="text-white/80 text-sm md:text-base">
								تبریز، ولیعصر، فلکه همافر، جنب داروخانه سیب
							</p>
						</div>

						<div className="flex gap-3 items-start">
							<img
								src="/assets/images/location.png"
								className="w-5 h-5 mt-1"
								alt="location"
							/>
							<p className="text-white/80 text-sm md:text-base">
								تهران، خیابان اندرزگو، نبش میدان اندرزگو
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-10">
						<div className="flex flex-col gap-4">
							<h4 className="text-white font-semibold text-lg">آشنایی با ما</h4>

							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								درباره ما
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								تماس با ما
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								اخبار
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								فرصت شغلی
							</span>
						</div>

						<div className="flex flex-col gap-4">
							<h4 className="text-white font-semibold text-lg">خدمات</h4>

							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								فروش خودرو
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								خرید اقساطی
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								مشاوره خرید
							</span>
							<span className="text-white/80 hover:text-white cursor-pointer text-sm">
								شرایط فروش
							</span>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-wrap justify-center md:justify-start gap-6 pt-10 border-t border-white/10">
					<div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center p-3">
						<img
							src="/assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
							alt="ecunion"
							className="max-w-full max-h-full object-contain"
						/>
					</div>
					<div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center p-3">
						<img
							src="/assets/images/instagram.png"
							alt="enamad"
							className="max-w-full max-h-full object-contain"
						/>
					</div>

					<div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center p-3">
						<img
							src="/assets/images/twitter-circle.png"
							alt="samandehi"
							className="max-w-full max-h-full object-contain"
						/>
					</div>

					<div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center p-3">
						<img
							src="/assets/images/whats-app.png"
							alt="ecunion"
							className="max-w-full max-h-full object-contain"
						/>
					</div>
				</div>

				<div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white/70 text-sm">
					<span>© تمامی حقوق این وبسایت برای رضاروور محفوظ است</span>

					<div className="flex gap-6">
						<span className="hover:text-white cursor-pointer">
							قوانین و مقررات
						</span>
						<span className="hover:text-white cursor-pointer">حریم خصوصی</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
