import Sidebar from "@/layout/adminLayout/sidebar";
import Image from "next/image";

function Dashboard() {
	return (
		<div className="w-full bg-secondry pt-10 pb-10  min-h-[calc(100vh-80px)] flex gap-12 ">
			<Sidebar />
			<div className="charts-div  h-[80vh] w-full mx-6 -mr-6 overflow-x-scroll ">
				<div className="div-top ">
					<div className="flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between">
						<div className="w-50 xl:min-w-70 h-36 bg-slate-800 text-white rounded-xl flex flex-col justify-center gap-2 items-center shadow-lg">
							<p className="text-sm mb-2">آمار فروش سالانه</p>
							<span className="text-3xl font-bold">4503200$</span>
						</div>

						<div className="w-50 xl:min-w-70 h-36 bg-slate-800 text-white rounded-xl flex flex-col justify-center gap-2 items-center shadow-lg">
							<p className="text-sm mb-2">تعداد خودروی فروخته شده</p>
							<span className="text-3xl font-bold">268</span>
						</div>
						<div className="w-50 xl:min-w-70 h-36 bg-slate-800 text-white rounded-xl flex flex-col justify-center gap-2 items-center shadow-lg">
							<p className="text-sm mb-2">سود خالص</p>
							<span className="text-3xl font-bold">2000000$</span>
						</div>
					</div>
				</div>
				<div className="div-btm mt-40 flex flex-col justify-center items-center gap-4 xl:flex-row md:justify-between ">
					<Image
						src="/assets/images/chart.png"
						alt="chart"
						width={300}
						height={300}
						className="lg:w-130 xl:w-145"
					/>
					<Image
						src="/assets/images/chart2.png"
						alt="chart"
						width={300}
						height={300}
						className=""
					/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
