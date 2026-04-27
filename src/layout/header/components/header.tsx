import ActiveLink from "./ActiveLink";

function Header() {
	return (
		<div>
			<div className="bg-black h-70 w-full">
				<div className="top flex justify-between items-center pt-1 pb-1 sm:px-2 lg:px-4 xl:px-6 mx-auto container">
					<div className="top-right ">
						<p className="text-white   font-vazir font-bold text-xl hidden lg:block  xl:block">
							رضاروور در شبکه های اجتماعی
						</p>
						<img
							src="../../assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
							alt="رضاروور"
							className="Block text-white w-20 h-20 lg:hidden xl:hidden"
						/>
					</div>

					<div className="top-left flex justify-center items-center ">
						<img
							src="../../assets/images/instagram.png"
							alt="instagram"
							className="w-10 h-10 "
						/>
						<img
							src="../../assets/images/twitter-circle.png"
							alt="twitter"
							className="w-10 h-10"
						/>
						<img
							src="../../assets/images/whats-app.png"
							alt="whatsapp"
							className="w-10 h-10"
						/>
					</div>
				</div>
				<div className="middle">
					<hr className="text-3xl text-white" />
				</div>
				<div className="bottom pt-1 sm:px-2 lg:px-4 xl:px-6 mx-auto container flex items-center justify-between">
					<div className="bottom-right flex items-center justify-center gap-8">
						<img
							src="../../assets/images/menu.png"
							alt="menu"
							className="w-10 h-10 lg:hidden xl:hidden "
						/>
						<img
							src="../../assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
							alt="رضاروور"
							className="hidden text-white w-20 h-20 lg:block xl:block"
						/>
						<nav className="flex items-center justify-center gap-8">
							<ActiveLink href="/">صفحه اصلی</ActiveLink>
							<ActiveLink href="/cart">لیست سفارشات</ActiveLink>
							<ActiveLink href="/about-us">درباره ما</ActiveLink>
							<ActiveLink href="/contact-us">ارتباط با ما</ActiveLink>
						</nav>
					</div>
					<div className="bottom-left flex items-center">
						<img
							src="../../assets/images/search.png"
							alt="search"
							className="w-10 h-10"
						/>
						<img
							src="../../assets/images/account-user-person-round (1).png"
							alt="search"
							className="w-10 h-10"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
