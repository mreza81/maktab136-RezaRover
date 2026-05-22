import z from "zod";

export const editProductScheema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	price: z.number().optional(),
	category: z.string().optional(),
	stock: z.number().optional(),
	brand: z.string().optional(),
});

export type EditProductScheemaType = z.infer<typeof editProductScheema>;
