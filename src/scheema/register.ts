import { z } from "zod";

export const registerScheema = z.object({
	name: z.string().nonempty("نام الزامی است"),
	email: z
		.string()
		.nonempty("ایمیل الزامی است")
		.email("ایمیل معتبر را وارد کنید"),
	password: z
		.string()
		.nonempty("رمز عبور الزامی است")
		.min(6, "رمز عبور حداقل 6 کاراکتر باشد"),
	phone: z.string().nonempty("شماره تلفن الزامی است"),
});
export type RegisterType = z.infer<typeof registerScheema>;
