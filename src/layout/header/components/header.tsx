function Header() {
	return (
		<div>
			<div className="bg-black h-70 w-full">
				<div className="top ">
					<div className="top-right pt-4">
						<p className="text-white   font-vazir font-bold hidden lg:block xl:block">
							رضاروور در شبکه های اجتماعی
						</p>
						<img
							src="../../assets/images/77756d51-bea4-4509-9ae1-8c8d28f62509.png"
							alt="رضاروور"
							className="Block text-white w-20 h-20"
						/>
					</div>
					<div className="top-left">
						<div>
							<img
								src="../../assets/images/instagram.png"
								alt="instagram"
								className="w-10 h-10"
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
				</div>
				<div className="middle"></div>
				<div className="bottom"></div>
			</div>
		</div>
	);
}

export default Header;
