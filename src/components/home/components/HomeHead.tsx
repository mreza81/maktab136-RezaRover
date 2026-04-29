function HomeHead() {
	return (
		<div className="w-screen h-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hevebg bg-cover bg-center py-20">
			<div className="absolute inset-0 bg-[#1212409E] z-2"></div>
			<div className="relative z-10 h-full flex items-center">
				<div className="w-full container mx-auto flex ">
					<div
						className="
        text-white
				text-center
				
        mx-auto
        max-w-[500px]
				
      
				md:text-right
				md:mr-0
       
      "
					>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							شرکت رضاروور
						</h1>

						<p className="mb-2 text-lg">بزرگترین وارد کننده خودروهای خارجی </p>

						<p className="mb-6 text-base opacity-90">
							بعد از ۷ سال برای اولین بار در ایران
						</p>

						<button className="bg-secondry hover:bg-white hover:cursor-pointer  hover:text-black transition px-6 py-3 rounded-lg">
							مشاوره و خرید
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeHead;
