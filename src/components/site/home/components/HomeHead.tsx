"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function HomeHead() {
	const router = useRouter();
	return (
		<div className="w-screen h-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] hevebg bg-cover bg-center py-20">
			<div className="absolute inset-0 bg-[#1212409E] z-2"></div>

			<div className="relative z-10 h-full flex items-center">
				<div className="w-full container mx-auto flex md:mx-10 ">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 2, ease: "easeOut" }}
						className="text-white text-center mx-auto md:mr-5 lg:mx-15 xl:mx-35 md:text-right overflow-y-hidden"
					>
						<h1 className="text-[46px] md: lg:text-[55px] xl:text-[100px] font-bold mb-4 xl:w-300 ">
							شرکت رضاروور
						</h1>

						<p className="mb-2 hidden lg:block text-xl xl:text-3xl">
							بزرگترین وارد کننده خودروهای لوکس اروپایی و آسیایی
						</p>

						<p className="mb-2 text-lg lg:hidden">
							بزرگترین وارد کننده خودروهای خارجی
						</p>

						<p className="mb-6 mt-4 text-base lg:text-lg xl:text-xl opacity-90">
							بعد از ۷ سال برای اولین بار در ایران
						</p>

						<button
							className="bg-primary hover:bg-white hover:cursor-pointer hover:text-black  transition-all duration-500 ease-in-out px-6 py-3 rounded-lg xl:px-12"
							onClick={() => router.push("/products")}
						>
							مشاوره و خرید
						</button>
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default HomeHead;
