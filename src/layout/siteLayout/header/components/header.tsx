import ActiveLink from "./ActiveLink";
import MobileMenu from "./mobileMenu";

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
							<ActiveLink href="/about-us">درباره ما</ActiveLink>
							<ActiveLink href="/contact-us">ارتباط با ما</ActiveLink>
						</nav>
					</div>

					<div className="flex-1 flex justify-center lg:justify-end mr-10 lg:mr-0">
						<div className="relative w-56 sm:w-72 md:w-96 lg:w-56 xl:w-90 ">
							<input
								type="text"
								placeholder="جستجو در خودروها..."
								className="w-full h-12 lg:h-13 pr-12 pl-5 text-sm sm:text-base lg:text-lg rounded-2xl border border-white/40 bg-transparent text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 transition-all duration-300"
							/>

							<img
								src="/assets/images/search.png"
								alt="search"
								className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 opacity-90"
							/>
						</div>
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
