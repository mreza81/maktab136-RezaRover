"use client";
export default function LoadingComponent() {
	return (
		<div className="flex flex-col justify-center items-center h-full gap-5">
			<p className="text-2xl font-bold text-violet-700">
				در حال بارگذاری اطلاعات
			</p>

			<div className="flex gap-2 justify-center items-center h-40">
				<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce"></div>
				<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce delay-150"></div>
				<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce delay-300"></div>
			</div>
		</div>
	);
}
