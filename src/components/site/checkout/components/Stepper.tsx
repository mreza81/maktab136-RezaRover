import { CreditCard, ShoppingBag, Sparkles, Truck } from "lucide-react";
import Link from "next/link";

function Stepper() {
	return (
		<div>
			<div className="max-w-7xl mx-auto my-8 px-4">
				<div className="flex items-center justify-center gap-4 py-8 rounded-2xl ">
					{/* مرحله ۱: سبد خرید */}
					<Link href={"/cart"}>
						<div className="flex flex-col items-center gap-2 group cursor-pointer">
							<div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-200 transition-all group-hover:scale-105">
								<ShoppingBag size={24} />
							</div>
							<span className="text-sm font-bold text-purple-600">
								سبد خرید
							</span>
						</div>
					</Link>

					{/* خط رابط */}
					<div className="w-16 md:w-32 h-[2px] bg-purple-100 mt-[-24px] relative overflow-hidden">
						<div className="absolute inset-0 bg-purple-600 w-full"></div>{" "}
						{/* نشانگر پیشرفت */}
					</div>
					{/* مرحله ۲: اطلاعات ارسال */}
					<div className="flex flex-col items-center gap-2 group cursor-pointer">
						<div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center border border-gray-100 transition-all group-hover:scale-105">
							<Truck size={24} />
						</div>
						<span className="text-sm font-medium text-purple-600 ">سفارش</span>
					</div>
					{/* خط رابط */}
					<div className="relative w-16 md:w-32 h-[2px] bg-gray-100 mt-[-24px]">
						<div className="absolute inset-0 bg-purple-600 w-1/2"></div>{" "}
					</div>
					{/* مرحله ۳: پرداخت */}
					<div className="flex flex-col items-center gap-2 group ">
						<div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100 transition-all group-hover:border-purple-200 group-hover:bg-purple-50">
							<CreditCard size={24} />
						</div>
						<span className="text-sm font-medium text-gray-400 group-hover:text-purple-400">
							پرداخت
						</span>
					</div>
				</div>
			</div>
			;
		</div>
	);
}

export default Stepper;
