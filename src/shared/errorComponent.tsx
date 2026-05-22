"use client";
function ErrorComponent() {
	return (
		<div className="flex flex-col justify-center items-center h-full gap-6">
			<p className="text-red-500 font-bold text-lg text-center">
				متاسفانه مشکلی در دریافت اطلاعات به وجود آمده
			</p>

			<button
				onClick={() => window.location.reload()}
				className="bg-violet-600 hover:bg-violet-700 transition text-white px-5 py-2 rounded-xl"
			>
				تلاش دوباره
			</button>
		</div>
	);
}

export default ErrorComponent;
