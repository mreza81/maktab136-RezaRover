function BlogCard({
	image,
	title,
	href,
}: {
	image: string;
	title: string;
	href: string;
}) {
	return (
		<div className="bg-[#f5eaff] rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300  flex flex-col justify-center items-center">
			<div className="mb-4">
				<img
					src={image}
					alt={title}
					className="w-full h-44 sm:h-48 md:h-52 object-cover rounded-xl"
				/>
			</div>

			<h3 className="text-right text-sm sm:text-base md:text-lg text-gray-800 font-bold mb-4 min-h-[48px] sm:min-h-[56px] leading-7">
				{title}
			</h3>

			<div className="text-right">
				<a href={href}>
					<button className="bg-[#6b21a8] hover:bg-white text-white hover:text-secondry transition-colors hover:cursor-pointer duration-300 text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg ">
						ادامه مطلب
					</button>
				</a>
			</div>
		</div>
	);
}

export default BlogCard;
