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

			<h3 className="text-right text-sm sm:text-base md:text-lg text-gray-800 font-bold mb-4  leading-7">
				{title}
			</h3>

			<div className="text-right">
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="bg-[#6b21a8] hover:bg-white text-white hover:text-secondry transition-colors duration-300 text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-lg block text-center"
				>
					ادامه مطلب
				</a>
			</div>
		</div>
	);
}

export default BlogCard;
