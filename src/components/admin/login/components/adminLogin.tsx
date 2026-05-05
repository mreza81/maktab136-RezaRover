"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/adminLoginType";
import { handleAdminLogin } from "../services/auth.services";
import { toast } from "react-toastify";

function AdminLoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user: User = {
		email,
		password,
	};
	const router = useRouter();
	const submit = async () => {
		try {
			const res = await handleAdminLogin(user);
			if (res.success) {
				toast.success("ورود ادمین با موفقیت انجام شد 🎉 ");
				console.log(res);
				router.push("/admin/MhdDgh1381/dashboard");
			}
		} catch {}
	};
	return (
		<div className="login-bg min-h-screen flex justify-center items-center  p-4">
			<form className="  bg-white/30 backdrop-blur-lg border border-white/20 w-full md:w-1/2 xl:w-1/3 rounded-2xl shadow-xl p-8 flex flex-col gap-6">
				<div className="mx-auto flex flex-col items-center justify-center gap-0">
					<img
						src={"/assets/images/935d21a7-0654-4363-a829-60c639fa0ce9.png"}
						className="w-30 "
					/>
				</div>
				<h1 className="text-2xl font-semibold text-gray-700 text-center">
					ورود ادمین
				</h1>

				<input
					type="email"
					placeholder="ایمیل"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
				/>

				<input
					type="password"
					placeholder="رمز عبور"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
				/>

				<button
					className="w-full h-12 bg-primary text-white rounded-xl text-lg font-medium hover:bg-primary/80 transition"
					onClick={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					ورود
				</button>
			</form>
		</div>
	);
}

export default AdminLoginComponent;
