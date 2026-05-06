"use client";
import Sidebar from "@/layout/adminLayout/sidebar";
import Image from "next/image";

// function Dashboard() {
// 	const router = useRouter();

// 	useEffect(() => {
// 		const token = Cookies.get("access-token");

// 		if (!token) {
// 			router.replace("/admin/MhdDgh1381/login");
// 		}
// 	}, []);

const Dashboard = () => {
	const stats = [
		{ title: "آمار فروش سالانه", value: "4,503,200$" },
		{ title: "تعداد خودرو فروخته شده", value: "268" },
		{ title: "سود خالص", value: "2,000,000$" },
		{ title: "کاربران فعال", value: "1,240" },
		{ title: "سفارشات در انتظار", value: "45" },
		{ title: "بازدید امروز", value: "8,920" },
	];

	return (
		<div className="  w-full  min-h-[calc(100vh-80px)] flex flex-col md:flex-row  gap-4 p-6 ">
			<Sidebar />

			<div className="flex-1 flex flex-col gap-8 overflow-hidden pt-5">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{stats.map((item, index) => (
						<div
							key={index}
							className="h-32 bg-slate-800 text-white rounded-2xl flex flex-col justify-center items-center shadow-md hover:shadow-xl transition-all border border-slate-700"
						>
							<p className="text-sm opacity-80 mb-1">{item.title}</p>
							<span className="text-2xl font-bold tracking-wider">
								{item.value}
							</span>
						</div>
					))}
				</div>

				<div className="flex flex-col xl:flex-row gap-6 mt-4">
					<div className="flex-1 relative min-h-64 xl:h-110">
						<Image
							src="/assets/images/nody--1661326214.jpg"
							alt="chart"
							fill
							className="rounded-xl object-cover shadow-lg border border-slate-700"
						/>
					</div>
					<div className="flex-1 relative min-h-64 xl:h-110">
						<Image
							src="/assets/images/nody--1661326220.png"
							alt="chart"
							fill
							className="rounded-xl object-cover shadow-lg border border-slate-700"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
