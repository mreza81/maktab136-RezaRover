"use client";
import { motion } from "framer-motion";

function Homebaner() {
	return (
		<div className="bg-baner w-full h-screen bg-center relative flex items-center justify-center">
			<div className="absolute inset-0 bg-black/70 z-2"></div>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 2, ease: "easeOut" }}
				className="relative z-20 text-center text-white px-4"
			>
				<h2 className="text-3xl   md:text-5xl lg:text-6xl font-bold mb-6">
					تجربه هیجان با خودروهای اسپورت
				</h2>
				<p className="text-sm sm:text-base md:text-lg lg:text-2xl  mb-8 text-gray-200 ">
					بهترین و خاص‌ترین خودروهای اسپورت جهان را با ما تجربه کنید.
				</p>
				<button className="bg-primary hover:bg-white hover:cursor-pointer hover:text-black transition px-6 py-3 rounded-lg xl:px-12">
					مشاهده خودروها
				</button>
			</motion.div>
		</div>
	);
}

export default Homebaner;
