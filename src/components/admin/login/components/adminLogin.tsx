"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handleAdminLogin } from "../services/auth.services";

import {
	adminLoginScheema,
	type AdminLoginScheemaType,
} from "@/scheema/adminLogin";

function AdminLoginComponent() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AdminLoginScheemaType>({
		resolver: zodResolver(adminLoginScheema),
	});
	const submit = async (data: AdminLoginScheemaType) => {
		try {
			const res = await handleAdminLogin(data);
			if (res) {
				toast.success("ورود ادمین با موفقیت انجام شد 🎉 ");

				router.push("/admin/MhdDgh1381/dashboard");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="login-bg min-h-screen flex justify-center items-center  p-4">
			<form
				className=" bg-white/30 backdrop-blur-lg border border-white/20 w-full md:w-1/2 xl:w-1/3 rounded-2xl shadow-xl p-8 flex flex-col gap-10"
				onSubmit={handleSubmit(submit)}
			>
				<div className="mx-auto flex flex-col items-center justify-center gap-0">
					<img
						src={"/assets/images/935d21a7-0654-4363-a829-60c639fa0ce9.png"}
						className="w-30 "
					/>
				</div>
				<h1 className="text-2xl font-semibold text-white text-center">
					ورود ادمین
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
						type="password"
						placeholder="رمز عبور"
						{...register("password")}
						className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
					/>
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
			</form>
		</div>
	);
}

export default AdminLoginComponent;
