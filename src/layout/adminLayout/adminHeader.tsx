"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ActiveLink from "../siteLayout/header/components/ActiveLink";

function AdminHeader() {
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-slate-800 h-20 px-7 ">
			<div className="flex items-center justify-between pt-2 ">
				<div className="right flex justify-center items-center ">
					<Image
						src="/assets/images/menu.png"
						alt="menu"
						width={50}
						height={50}
						className="lg:hidden "
						onClick={() => setOpen(true)}
					/>
					<Image
						src="/assets/images/home.png"
						alt="home"
						width={70}
						height={70}
						className="hidden lg:block hover:corsor-pointer"
					/>

					{open && (
						<div
							onClick={() => setOpen(false)}
							className="fixed inset-0 bg-black/50 z-60"
						></div>
					)}

					{/* Menu */}
					<div
						className={`fixed top-0 right-0 w-[50%] h-screen bg-slate-800 z-70 shadow-xl 
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
					>
						<div className="mh-top flex flex-col items-center justify-center pb-2">
							<img
								src="../../assets/images/252d1554-ffae-497b-a581-d544a859c373.png"
								alt="RezaRover"
								className="w-20 h-20"
							/>
							<div className=" text-xl text-white mr-2 ">نام ادمین</div>
						</div>
						<div className="middle">
							<hr className="text-3xl text-white pb-2" />
						</div>
						<div>
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
										موجودی
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

					{/* <Image
						src="/assets/images/ws-black.png"
						alt="whatsapp"
						width={55}
						height={55}
						className="hidden lg:block"
					/>
					<Image
						src="/assets/images/0f810f5b-6a9a-4485-878d-11411a1c500b.png"
						alt="twitter"
						width={50}
						height={50}
						className="hidden lg:block"
					/>
					<Image
						src="/assets/images/3dc87494-38d2-4584-97ed-0ebf7ea5da7c.png"
						alt="insta"
						width={50}
						height={50}
						className="hidden md:block"
					/> */}
				</div>
				<div className="center flex justify-center items-center gap-5">
					<Image
						src="/assets/images/5a1465fa-9e6b-4f2d-9751-bf48e4568742.png"
						alt="Admin Logo"
						width={80}
						height={40}
						className="hidden"
					/>
					<div className="text-2xl hidden md:block text-white">
						{" "}
						به پنل مدیریت رضاروور خوش آمدید
					</div>
				</div>
				<div className="">
					<Image
						src="/assets/images/account-user-person-round (1).png"
						alt="Admin Logo"
						width={55}
						height={55}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdminHeader;
