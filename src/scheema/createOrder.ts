import z from "zod";

export const createOrderScheema = z.object({
	shippingAddress: z.object({
		name: z.string().nonempty("نام الزامی است"),
		address: z.string().nonempty("آدرس الزامی است"),
		phone: z
			.string()
			.nonempty("شماره تلفن الزامی است")
			.min(11, "شماره تلفن باید 11 رقم باشد")
			.max(11, "شماره تلفن باید 11 رقم باشد"),
	}),
});

export type createOrderScheemaType = z.infer<typeof createOrderScheema>;
