import Image from "next/image";

function AdminHeader() {
	return (
		<div className="bg-white h-20 px-5 ">
			<div className="flex items-center justify-between mt-2 ">
				<div className="right flex justify-center items-center gap-2 ">
					<Image
						src="/assets/images/4ec01bfd-933e-4e66-ba3c-b740a304d6c1.png"
						alt="menu"
						width={50}
						height={50}
						className="md:hidden"
					/>
					<Image
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
					/>
				</div>
				<div className="center flex justify-center items-center gap-5">
					<Image
						src="/assets/images/5a1465fa-9e6b-4f2d-9751-bf48e4568742.png"
						alt="Admin Logo"
						width={80}
						height={40}
						className="hidden"
					/>
					<div className="text-2xl hidden md:block">
						{" "}
						به پنل مدیریت رضاروور خوش آمدید
					</div>
				</div>
				<div className="bg-amber-900">
					<Image
						src="/assets/images/394b4ae3-d052-4aa5-8550-80cb99eaf4d4.png"
						alt="Admin Logo"
						width={60}
						height={60}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdminHeader;
