import z from "zod";

export const addProductScheema = z.object({
	name: z.string().nonempty("نام محصول الزامی است"),
	description: z
		.string()
		.min(1, "توضیحات الزامی است")
		.refine((val) => {
			// این کد تگ‌های HTML را حذف می‌کند و چک می‌کند آیا متن واقعی باقی می‌ماند یا خیر
			const strippedString = val.replace(/<[^>]*>?/gm, "").trim();
			return strippedString.length > 0;
		}, "توضیحات نمی‌تواند خالی باشد"),
	price: z.number().min(1, "قیمت باید بزرگتر از صفر باشد"),
	category: z.string().nonempty("دسته بندی الزامی است"),
	stock: z.number().min(1, "تعداد باید حداقل 1 باشد"),
	brand: z.string().nonempty("برند الزامی است"),
	images: z.array(z.instanceof(File)).min(1, "افزودن حداقل یک عکس الزامی است"),
});
export type AddProductScheemaType = z.infer<typeof addProductScheema>;
