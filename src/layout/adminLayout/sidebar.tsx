import Image from "next/image";
import ActiveLink from "../siteLayout/header/components/ActiveLink";

function Sidebar() {
	return (
		<div>
			<div className="hidden h-[80vh] xl:block bg-slate-800  w-50 pt-2  xl:w-70 xl:pt-4    rounded-xl mt-5">
				<div className=" flex  flex-col items-center justify-center lg:flex-row-reverse lg:justify-between  px-2">
					<Image
						src="/assets/images/252d1554-ffae-497b-a581-d544a859c373 (1).png"
						alt="Admin Logo"
						width={70}
						height={40}
						className=""
					/>
					<div className=" text-xl text-white mr-2 ">پنل</div>
				</div>
				<div>
					<hr className="text-white text-2xl mt-3" />
				</div>
				<div className="bottom mt-3 mr-2 flex flex-col items-start justify-center gap-3">
					<div className="flex justify-start items-center gap-1">
						<Image
							src="/assets/images/whiteHome"
							alt="Admin Logo"
							width={40}
							height={40}
							className=""
						/>
						<ActiveLink href="/admin/MhdDgh1381/dashboard">
							صفحه اصلی
						</ActiveLink>
					</div>
					<div className="flex justify-center items-center gap-1">
						<Image
							src="/assets/images/carwhite2.png"
							alt="Admin Logo"
							width={40}
							height={40}
							className=""
						/>
						<ActiveLink href="/admin/MhdDgh1381/dashboard/products">
							محصولات
						</ActiveLink>
					</div>
					<div className="flex justify-start items-center gap-1">
						<Image
							src="/assets/images/anbar.png"
							alt="Admin Logo"
							width={40}
							height={40}
							className=""
						/>
						<ActiveLink href="/admin/MhdDgh1381/dashboard/inventory">
							موجودی و قیمت
						</ActiveLink>
					</div>
					<div className="flex justify-start items-center gap-1">
						<Image
							src="/assets/images/inventory2.png"
							alt="Admin Logo"
							width={40}
							height={40}
							className=""
						/>
						<ActiveLink href="/admin/MhdDgh1381/dashboard/orders">
							سفارشات
						</ActiveLink>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
