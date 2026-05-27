import { BASE_URL } from "@/api/BASE-URL/BASE-URL";
import { ChevronLeft, Package, ShoppingBag } from "lucide-react";
import { getMyOrders } from "../services/getMyOrders.service";
import Link from "next/link";

async function MyOrders() {
	let orders = [];

	try {
		const res = await getMyOrders();
		orders = res?.data || [];
		console.log(orders);
	} catch (error) {
		orders = [];
	}

	const getStatusText = (status: any) => {
		switch (status) {
			case "pending":
				return "در انتظار بررسی";
			case "paid":
				return "پرداخت شده";
			case "shipped":
				return "ارسال شده";
			case "delivered":
				return "تحویل داده شده";
			case "cancelled":
				return "لغو شده";
			default:
				return status || "نامشخص";
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen" dir="rtl">
			<div className="w-full h-20 lg:h-24 bg-secondry"></div>

			<div className="max-w-5xl mx-auto p-4 my-5 sm:p-6">
				<h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
					<Package className="w-5 h-5 text-purple-600" />
					سفارش‌های من
				</h1>

				{orders.length > 0 ? (
					<div className="flex flex-col gap-6">
						{orders.map((order: any) => (
							<div
								key={order._id}
								className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
							>
								{/* اطلاعات کلی سفارش */}
								<div className="p-4 border-b border-gray-100 bg-gray-50">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
										<div className="text-sm text-gray-700 space-y-1">
											<p>
												<span className="font-bold">کد سفارش:</span> {order._id}
											</p>
											<p>
												<span className="font-bold">وضعیت:</span>{" "}
												{getStatusText(order.status)}
											</p>
											<p>
												<span className="font-bold">مبلغ کل:</span>{" "}
												{order.totalPrice} دلار
											</p>
										</div>

										<div className="text-sm text-gray-600 space-y-1">
											<p>
												<span className="font-bold">نام گیرنده:</span>{" "}
												{order.shippingAddress?.name}
											</p>
											<p>
												<span className="font-bold">شماره تماس:</span>{" "}
												{order.shippingAddress?.phone}
											</p>
											<p>
												<span className="font-bold">آدرس:</span>{" "}
												{order.shippingAddress?.address}
											</p>
										</div>
									</div>
								</div>

								{/* لیست محصولات سفارش */}
								<div className="p-4 flex flex-col gap-4">
									{order.orderItems?.map((item: any) => (
										<div
											key={item._id}
											className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-lg p-3"
										>
											<img
												src={`${BASE_URL}${item.product.images?.[0]}`}
												alt={item.name}
												className="w-full sm:w-35 h-40 sm:h-24 object-cover rounded-lg bg-gray-100"
											/>

											<div className="flex-1 text-center sm:text-right">
												<h2 className="font-bold text-gray-900">{item.name}</h2>
												<div className="text-sm text-gray-500 mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
													<span>تعداد: {item.quantity} دستگاه</span>
													<span>قیمت: {item.price} دلار</span>
													{item.product?.brand && (
														<span>برند: {item.product.brand}</span>
													)}
													{item.product?.category && (
														<span>دسته: {item.product.category}</span>
													)}
												</div>
												<div className="text-sm text-gray-500 mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
													{order?.createdAt && (
														<span>
															تاریخ ثبت سفارش:{" "}
															{new Date(order.createdAt).toLocaleDateString(
																"fa-IR",
															)}
														</span>
													)}
												</div>
											</div>
										</div>
									))}
								</div>

								{/* فوتر سفارش */}
								<div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
									<div className="text-sm text-gray-600">
										<span className="font-bold">روش پرداخت:</span>{" "}
										{order.paymentMethod === "cash"
											? "نقدی"
											: order.paymentMethod}
									</div>

									<button className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
										مشاهده جزئیات
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
						<ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
						<p className="text-gray-600 mb-6">هنوز سفارشی ثبت نکرده‌اید.</p>
						<Link href="/products">
							<button className="text-purple-600 font-bold flex items-center gap-1 mx-auto hover:underline cursor-pointer">
								مشاهده محصولات
								<ChevronLeft className="w-4 h-4" />
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default MyOrders;
