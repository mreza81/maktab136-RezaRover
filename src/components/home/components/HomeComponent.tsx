function HomeComponent() {
	return (
		<div>
			{/* <div className="relative w-screen h-screen left-1/2 right-1/2 -mx-[50vw]">
				<img
					src="../../assets/images/دانلود-عکس-ماشین-با-کیفیت-8k-برای-کامپیوتر.jpg"
					alt=""
					className="w-full h-full object-cover"
				/>

				<div className="absolute inset-0 bg-[#1212409E]"></div>
				<div className="absolute inset-0 text-white mx-auto my-auto container  max-w-[300px]">
					<h1>شرکت رضاروور</h1>
					<p>بزرگترین وارد کننده و فروشنده خودروهای خارجی و داخلی</p>
					<p>بعد از 7 سال برای اولین بار در ایران</p>
				</div>
			</div> */}
			<div className="w-screen h-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hevebg bg-cover bg-center py-20">
				<div className="absolute inset-0 bg-[#1212409E]"></div>
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

							<p className="mb-2 text-lg">
								بزرگترین وارد کننده خودروهای خارجی{" "}
							</p>

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
		</div>
	);
}

export default HomeComponent;
