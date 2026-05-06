"use client";
import { useState } from "react";
import ActiveLink from "./ActiveLink";
import Link from "next/link";

function MobileMenu() {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{/* دکمه منو */}
			<img
				src="../../assets/images/menu.png"
				alt="menu"
				className="w-10 h-10 lg:hidden xl:hidden"
				onClick={() => setOpen(true)}
			/>

			{/* Overlay */}
			{open && (
				<div
					onClick={() => setOpen(false)}
					className="fixed inset-0 bg-black/50 z-60"
				></div>
			)}

			{/* Menu */}
			<div
				className={`fixed top-0 right-0 w-[50%] h-screen bg-secondry z-70 shadow-xl 
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
			>
				<div className="mh-top flex items-center justify-center pb-2">
					<img
						src="../../assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
						alt="RezaRover"
						className="w-20 h-20"
					/>
				</div>
				<div className="middle">
					<hr className="text-3xl text-white" />
				</div>
				<nav className="flex flex-col items-start justify-start gap-8 mt-10 mr-5 ">
					<Link href="/" className="text-white sm:text-[10] md:text-lg  ">
						صفحه اصلی
					</Link>
					<Link href="/cart " className="text-white sm:text-[10] md:text-lg ">
						لیست سفارشات
					</Link>
					<Link
						href="/about-us"
						className="text-white sm:text-[10] md:text-lg "
					>
						درباره ما
					</Link>
					<Link
						href="/contact-us"
						className="text-white  sm:text-[10]  md:text-lg"
					>
						ارتباط با ما
					</Link>
				</nav>

				<div className="bg-white w-full h-10 flex justify-center items-center gap-2 mt-40">
					<div className="flex items-center justify-center  text-VazirBold">
						02141713
					</div>
					<div className="bg-primary rounded-[50%] w-2 h-2"></div>
				</div>
			</div>
		</div>
	);
}

export default MobileMenu;
