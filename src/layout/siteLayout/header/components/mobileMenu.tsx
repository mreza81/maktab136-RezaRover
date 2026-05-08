"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

function MobileMenu() {
	const [open, setOpen] = useState(false);

	// جلوگیری از اسکرول صفحه وقتی منو باز است
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [open]);

	return (
		<div className="lg:hidden">
			<img
				src="/assets/images/menu.png"
				alt="menu"
				className="w-10 h-10 cursor-pointer hover:scale-110 transition"
				onClick={() => setOpen(true)}
			/>

			<div
<<<<<<< HEAD
				onClick={() => setOpen(false)}
				className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
					open ? "opacity-100 visible" : "opacity-0 invisible"
				}`}
			></div>

			<div
				className={`fixed top-0 right-0 w-[80%] max-w-87.5 h-screen bg-linear-to-b from-secondry to-black 
        z-50 shadow-2xl transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
=======
				className={`fixed top-0 right-0 w-[50%] h-screen bg-secondry z-70 shadow-xl 
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
>>>>>>> main
			>
				<div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
					<img
						src="/assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
						alt="RezaRover"
						className="w-16 h-16"
					/>

					<button
						onClick={() => setOpen(false)}
						className="text-white text-2xl hover:rotate-90 transition duration-300"
					>
						✕
					</button>
				</div>

				<nav className="flex flex-col gap-8 mt-12 px-8 text-lg font-semibold">
					<ActiveLink href="/">صفحه اصلی</ActiveLink>

					<ActiveLink href="/cart">لیست سفارشات</ActiveLink>

					<ActiveLink href="/about-us">درباره ما</ActiveLink>

					<ActiveLink href="/contact-us">ارتباط با ما</ActiveLink>
				</nav>

				<div className="absolute bottom-0 w-full bg-white py-4 flex justify-center items-center gap-3">
					<span className="text-black font-bold">02141713</span>
					<div className="bg-primary rounded-full w-2 h-2"></div>
				</div>
			</div>
		</div>
	);
}

export default MobileMenu;
