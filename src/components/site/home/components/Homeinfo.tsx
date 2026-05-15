import Image from "next/image";

function Homeinfo() {
	return (
		<div className="w-screen  relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-gray-200 px-5">
			<div className="w-full   py-10">
				<div className="hc-top flex flex-col items-center justify-center gap-5 text-center">
					<div className="logo flex justify-center items-center bg-primary rounded-xl w-30 h-30">
						<Image
							src="/assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
							alt="رضاروور"
							width={500}
							height={300}
						/>
					</div>
					<div className="text-2xl font-bold text-gray-900">
						چرا شرکت رضاروور برترین است؟
					</div>
				</div>
				<div className="w-full flex justify-center items-center">
					<div className="hc-bottom mt-15 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 w-400 gap-x-9  ">
						<div className="bg-white rounded-xl shadow-md p-8 text-center  w-1/2 md:w-125 lg:w-115 xl:w-auto  mx-auto  ">
							{/* icon placeholder */}
							<div className="max-w-17 h-14 mx-auto mb-4  rounded-lg ">
								<Image
									src="/assets/images/credit-card.png"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">خرید اقساطی</h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								شرکت رضاروور با ارائه خدمات فروش اقساطی، این امکان را برای
								مشتریان فراهم می‌کند تا خودروی مورد نظر خود را بدون پرداخت نقدی
								کامل خریداری کنند.
							</p>
						</div>
						<div className=" rounded-xl bg-white shadow-md p-8 text-center w-1/2 md:w-125 lg:w-115 xl:w-auto  mx-auto ">
							{/* icon placeholder */}
							<div className="w-17 h-10 mx-auto mb-4  rounded-lg flex items-center justify-center">
								<Image
									src="/assets/images/clock-circle.png"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">تحویل به موقع </h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								رضاروور به شما این امکان را می‌دهد که بدون نیاز به انتظار
								طولانی، خودرو را در زمان تعیین شده دریافت کنید و از تجربه خریدی
								سریع و راحت لذت ببرید.
							</p>
						</div>
						<div className="bg-white rounded-xl shadow-md p-8 text-center  w-1/2 md:w-125 lg:w-115 xl:w-auto mx-auto">
							{/* icon placeholder */}
							<div className="w-17 h-14 mx-auto mb-4  rounded-lg flex items-center justify-center">
								<Image
									src="/assets/images/shrink.png"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">بدون واسطه </h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								شرکت رضاروور با واردات مستقیم خودرو از تولیدکنندگان معتبر،
								محصولات خود را بدون واسطه به مشتریان عرضه می‌کند.
							</p>
						</div>
						<div className="bg-white rounded-xl shadow-md p-8 text-center  w-1/2 md:w-125 lg:w-115 xl:w-auto mx-auto ">
							{/* icon placeholder */}
							<div className="w-17 h-14 mx-auto mb-4  rounded-lg flex items-center justify-center">
								<Image
									src="/assets/images/car.svg"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">واردات سفارشی</h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								اگر خودروی موردنظر شما در لیست موجود نباشد، ما امکان واردات
								سفارشی آن را فراهم می‌کنیم.
							</p>
						</div>
						<div className="bg-white rounded-xl shadow-md p-8 text-center  w-1/2 md:w-125 lg:w-115 xl:w-auto mx-auto ">
							{/* icon placeholder */}
							<div className="w-17 h-14 mx-auto mb-4  rounded-lg flex items-center justify-center">
								<Image
									src="/assets/images/transaction.svg"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">
								امکان فروش و معاوضه خودرو
							</h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								مشتری می‌تواند خودروی فعلی خود را با بهترین قیمت به ما بفروشد یا
								با خودروهای موجود معاوضه کند.
							</p>
						</div>
						<div className="bg-white rounded-xl shadow-md p-8 text-center  w-1/2 md:w-125 lg:w-115 xl:w-auto mx-auto ">
							{/* icon placeholder */}
							<div className="w-17 h-14 mx-auto mb-4  rounded-lg flex items-center justify-center">
								<Image
									src="/assets/images/safety-certificate.png"
									alt="card"
									width={500}
									height={300}
								/>
							</div>

							{/* title */}
							<h3 className="text-lg font-bold mb-3">دارای گارانتی</h3>

							{/* text */}
							<p className="text-gray-600 leading-7 text-sm hidden md:block">
								تمامی خودرو های شرکت رضاروور به دلیل اطمینان خاطر مشتریان عزیز
								شامل یک سال گارانتی می باشند.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Homeinfo;
