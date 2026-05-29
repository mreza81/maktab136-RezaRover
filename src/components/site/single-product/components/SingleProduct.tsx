import Breadcrumb from "@/shared/breadcrump";
import { ProductType } from "@/types/productTypeAndOrders";
import { singleProductService } from "../services/singleProduct.services";
import Images from "./images";
import ChooseBox from "./chooseBox";
import ProductTabs from "./tabComponent";
import { getCart } from "../../cart/services/getCart.services";
import { getProducts } from "@/api/getProducts/getProducts.service";
import LikedProductsSwiper from "./likedProductsSwiper";

async function SingleProduct({ params }: { params: { id: string } }) {
	const param = await params;
	const id = param.id;
	const res = await singleProductService(id);
	const product: ProductType = res.data;
	const likedProductsRes = await getProducts("", "", product.category, 1, 20);
	const likedProductsData = likedProductsRes.data;

	return (
		<div className="w-full">
			<div className="w-full h-20 lg:h-25 bg-secondry"></div>

			<div className="mr-6">
				<Breadcrumb />
			</div>

			{/* ---------------- GRID اصلاح شده ---------------- */}
			<div
				className="
                top grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                mx-6
                gap-5 sm:gap-6 md:gap-7 lg:gap-8
								my-5
            "
			>
				{/* ---------------- بخش تصاویر ---------------- */}
				<div className="images-div  w-full 65">
					<Images product={product} />
				</div>

				{/* ---------------- باکس مشخصات محصول ---------------- */}
				<div className="w-full min-w-65 rounded-xl bg-[#F5F3FF] p-6 md:p-7 shadow-sm border border-purple-200">
					<h2 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center mb-6">
						{product.name}
					</h2>

					<div className="flex flex-col text-gray-800">
						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">بدنه</span>
							<span className="text-gray-700">{product.category}</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">برند</span>
							<span className="text-gray-700">{product.brand}</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">موتور </span>
							<span className="text-gray-700">۴۰۰۰ سی‌سی</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">سوخت</span>
							<span className="text-gray-700">بنزین</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">سال ساخت</span>
							<span className="text-gray-700">۲۰۲۳</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">سیستم صوتی</span>
							<span className="text-gray-700">هارمن کاردن</span>
						</div>

						<div className="flex justify-between items-center py-3 border-b border-purple-100">
							<span className="font-semibold">چرخ و لاستیک</span>
							<span className="text-gray-700">رینگ آلومینیومی 22 اینچ</span>
						</div>
					</div>
				</div>

				{/* ---------------- باکس قیمت و خرید ---------------- */}
				<ChooseBox product={product} />
			</div>
			<div className="w-full px-6">
				<div className="w-full  h-1 bg-gray-200 mb-5 "></div>
			</div>
			{/*باکس پایین*/}
			<div
				className="
    w-full px-6 
    grid 
    grid-cols-1        /* موبایل */
    lg:grid-cols-3     /* دسکتاپ */
    gap-6 
    mb-10
  "
			>
				{/* ستون 1 : تب‌ها */}
				<div className="col-span-1">
					<ProductTabs product={product} />
				</div>

				{/* ستون 2 و 3 : محصولات مشابه */}
				<div className="col-span-1 lg:col-span-2">
					<LikedProductsSwiper likedProductsData={likedProductsData} />
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;
