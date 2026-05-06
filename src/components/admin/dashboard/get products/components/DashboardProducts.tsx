import Sidebar from "@/layout/adminLayout/sidebar";

function DashboardProducts() {
	return (
		<div className="  w-full bg-white min-h-[calc(100vh-80px)] lg:flex  lg:flex-row  gap-4 p-6 mx-auto">
			<Sidebar />
			<div className="bg-amber-200 h-[80vh] w-full mt-5 flex flex-col justify-start items-start">
				<div className="add-and-search-buttons flex justify-between items-center "></div>
			</div>
		</div>
	);
}

export default DashboardProducts;
