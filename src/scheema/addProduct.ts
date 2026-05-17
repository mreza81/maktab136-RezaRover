import z from "zod";

export const addProductScheema = z.object({
	name: z.string().nonempty("نام محصول الزامی است"),
	description: z.string().nonempty("توضیحات الزامی است"),
	price: z.number().min(1, "قیمت باید بزرگتر از صفر باشد"),
	category: z.string().nonempty("دسته بندی الزامی است"),
	stock: z.number().min(1, "تعداد باید حداقل 1 باشد"),
	brand: z.string().nonempty("برند الزامی است"),
	images: z.array(z.string().nonempty("افزودن حداقل یک عکس الزامی است")),
});
export type AddProductScheemaType = z.infer<typeof addProductScheema>;
