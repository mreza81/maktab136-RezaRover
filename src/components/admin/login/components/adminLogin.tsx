"use client";
import { User } from "@/types/adminLoginType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleAdminLogin } from "../services/auth.services";

function AdminLoginComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();
	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		const user: User = {
			email,
			password,
		};
		try {
			const res = await handleAdminLogin(user);
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
				className=" bg-white/30 backdrop-blur-lg border border-white/20 w-full md:w-1/2 xl:w-1/3 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
				onSubmit={submit}
			>
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
					value={email}
					placeholder="ایمیل"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
				/>

				<input
					type="password"
					placeholder="رمز عبور"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/40 transition outline-none"
				/>

				<button
					type="submit"
					className="w-full h-12 bg-primary text-white rounded-xl text-lg font-medium hover:bg-primary/80 transition"
				>
					ورود
				</button>
			</form>
		</div>
	);
}

export default AdminLoginComponent;
