"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginScheema, LoginType } from "@/scheema/login";
import { handleUserLogin } from "../services/userLogin.serices";
import Link from "next/link";

function UserLoginComponent() {
	const [passwordInputType, setPasswordInputType] = useState("password");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginType>({
		resolver: zodResolver(loginScheema),
	});
	const submit = async (data: LoginType) => {
		try {
			const res = await handleUserLogin(data);
			if (res) {
				toast.success("ورود کاربر با موفقیت انجام شد 🎉 ");

				router.push("/");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="admin-login-bg min-h-screen flex justify-center items-center  p-4 pt-30 lg:pt-0">
			<form
				className=" bg-white/30 backdrop-blur-lg border border-white/20 w-full md:w-1/2 xl:w-1/3 rounded-2xl shadow-xl p-8 flex flex-col gap-10"
				onSubmit={handleSubmit(submit)}
			>
				<h1 className="text-2xl font-semibold text-white text-center">
					ورود کاربر
				</h1>
				<div className="relative w-full flex flex-col irems-start gap-1">
					<input
						type="email"
						placeholder="ایمیل"
						{...register("email")}
						className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
					/>
					{errors.email && (
						<p className="text-red-700 absolute -bottom-6 right-0 text-sm ">
							{errors.email.message}
						</p>
					)}
				</div>
				<div className="relative w-full flex flex-col irems-start gap-1">
					<input
						type={passwordInputType}
						placeholder="رمز عبور"
						{...register("password")}
						className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
					/>
					{passwordInputType == "password" && (
						<img
							src="/assets/images/eye.svg"
							alt="eye"
							className="absolute left-2 w-7 h-7 top-3 cursor-pointer"
							onClick={() => setPasswordInputType("text")}
						></img>
					)}
					{passwordInputType == "text" && (
						<img
							src="/assets/images/eye-invisible.svg"
							alt="eye-invisible"
							className="absolute left-2 w-7 h-7 top-3 cursor-pointer"
							onClick={() => setPasswordInputType("password")}
						></img>
					)}
					{errors.password && (
						<p className="text-red-700 absolute -bottom-6 right-0 text-sm ">
							{errors.password.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="w-full h-12 bg-primary text-white rounded-xl text-lg font-medium hover:bg-primary/80 transition"
					disabled={isSubmitting}
					formNoValidate
				>
					ورود
				</button>
				<div className="w-full flex justify-start items-center gap-2">
					<span className="">آیا حساب کاربری ندارید؟</span>
					<Link href={"/register"} className="text-primary text-sm">
						ساخت حساب کاربری
					</Link>
				</div>
			</form>
		</div>
	);
}

export default UserLoginComponent;
