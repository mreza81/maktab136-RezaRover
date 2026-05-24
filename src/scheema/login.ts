import { z } from "zod";

export const loginScheema = z.object({
	email: z
		.string()
		.nonempty("ایمیل الزامی است")
		.email("ایمیل معتبر را وارد کنید"),
	password: z.string().nonempty("رمز عبور الزامی است"),
});
export type LoginType = z.infer<typeof loginScheema>;
