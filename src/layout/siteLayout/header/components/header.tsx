"use client";
import { Suspense } from "react";
import ActiveLink from "./ActiveLink";
import MobileMenu from "./mobileMenu";
import Search from "./search";

function Header() {
	return (
		<header className="relative z-50 max-w-full md:mx-10 lg:mx-10 xl:mx-27">
			<div className="absolute top-0 left-0 right-0 h-24 ">
				<div className="w-full flex items-center justify-between pt-3 px-4 sm:px-6 lg:px-12 xl:px-16  ">
					<div className="flex items-center gap-6 lg:gap-6 xl:gap-8 ">
						<MobileMenu />

						<img
							src="/assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
							alt="رضاروور"
							className="hidden lg:block w-18 h-18 xl:w-20 xl:h-20 "
						/>

						<nav className="hidden lg:flex items-center lg:gap-4  xl:gap-10 text-[18px] font-semibold text-white">
							<ActiveLink href="/">صفحه اصلی</ActiveLink>
							<ActiveLink href="/products"> محصولات</ActiveLink>
							<ActiveLink href="/contact-us">درباره ما</ActiveLink>
							<ActiveLink href="/about-us">ارتباط با ما</ActiveLink>
						</nav>
					</div>

					<div className="flex-1 flex justify-center lg:justify-end mr-10 lg:mr-0">
						<Suspense fallback={null}>
							<Search />
						</Suspense>
					</div>

					<div className="flex items-center mr-6">
						<img
							src="/assets/images/shopping-cart.svg"
							alt="shop"
							className="hidden lg:block lg:w-10 lg:h-10 xl:w-11 xl:h-11 cursor-pointer hover:scale-110 transition duration-300"
						/>
					</div>

					<div className="flex items-center mr-6">
						<img
							src="/assets/images/account-user-person-round (1).png"
							alt="account"
							className="w-12 h-12 xl:w-14 xl:h-14 cursor-pointer hover:scale-110 transition duration-300"
						/>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
