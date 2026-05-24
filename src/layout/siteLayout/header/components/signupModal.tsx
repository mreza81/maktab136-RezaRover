"use client";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfileService } from "../services/getProfile.service";

function SignupModal() {
	const [openModal, setOpenModal] = useState(false);
	const token = Cookies.get("access-token");
	const router = useRouter();
	const [userData, setUserData] = useState<any>(null);
	const getprofile = async () => {
		const res = await getProfileService();
		setUserData(res);
	};
	useEffect(() => {
		if (openModal && token && !userData) {
			getprofile();
		}
	}, [openModal]);
	return (
		<div className="flex items-center justify-center ">
			<img
				src="/assets/images/account-user-person-round (1).png"
				alt="account"
				className="w-12 h-12 xl:w-14 xl:h-14 cursor-pointer hover:scale-110 transition duration-300 relative"
				onClick={() => {
					setOpenModal(true);
				}}
			/>
			<AnimatePresence>
				{openModal && token !== undefined && (
					<motion.div
						className="absolute top-17 lg:top-22 left-10 lg:left-5 md:left-5 flex flex-col justify-center items-start gap-4 bg-white  p-3 rounded-md xl:w-50 xl:gap-6"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
					>
						<div
							className="flex justify-start items-center gap-3 "
							onClick={() => setOpenModal(false)}
						>
							<X
								size={20}
								className="text-red-500 hover:text-black cursor-pointer xl:w-7 xl:h-7"
							/>
						</div>
						<div className="flex justify-start items-center gap-3 cursor-pointer ">
							<img
								src="/assets/images/user.svg"
								alt="user"
								className="w-5 h-5 xl:w-7 xl:h-7 "
							/>
							<p className="font-bold xl:text-xl">
								{userData?.data.name || "درحال بارگذاری"}
							</p>
						</div>
						<div className="flex justify-start items-center gap-3 cursor-pointer">
							<img
								src="/assets/images/bx-border-all.svg"
								alt="order"
								className="w-5 h-5 xl:w-7 xl:h-7 "
							/>
							<p className="xl:text-xl">سفارشات</p>
						</div>
						<div
							className="flex justify-start items-center gap-3 cursor-pointer"
							onClick={() => {
								Cookies.remove("access-token");
								Cookies.remove("refresh-token");
								Cookies.remove("role");
								toast.success("خروج از حساب کاربری با موفقیت انجام شد");
								setOpenModal(false);
							}}
						>
							<img
								src="/assets/images/bx-log-out.svg"
								alt="logout"
								className="w-5 h-5 xl:w-7 xl:h-7"
							/>
							<p className="xl:text-xl">خروج</p>
						</div>
					</motion.div>
				)}
				<AnimatePresence>
					{openModal && token == undefined && (
						<motion.div
							className="absolute top-17 lg:top-22 left-10 lg:left-5 md:left-5 flex flex-col justify-center items-start gap-4 bg-white  p-3 rounded-md xl:w-50 xl:gap-6"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
						>
							<div
								className="flex justify-start items-center gap-3 "
								onClick={() => setOpenModal(false)}
							>
								<X
									size={20}
									className="text-red-500 hover:text-black cursor-pointer xl:w-7 xl:h-7"
								/>
							</div>
							<div
								className="flex justify-start items-center gap-3 cursor-pointer "
								onClick={() => {
									router.push("/login");
									setOpenModal(false);
								}}
							>
								<img
									src="/assets/images/bx-log-in.svg"
									alt="user"
									className="w-5 h-5 xl:w-7 xl:h-7 "
								/>
								<p className="font-bold xl:text-xl">ورود</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</AnimatePresence>
		</div>
	);
}

export default SignupModal;
