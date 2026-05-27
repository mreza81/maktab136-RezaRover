import { createOrderScheemaType } from "@/scheema/createOrder";
import { create } from "zustand";

interface OrderState {
	formData: createOrderScheemaType;
	paymentMethod: string;
	setFormData: (data: Partial<createOrderScheemaType>) => void;
	setPaymentMethod: (method: string) => void;
}
export const useOrderStore = create<OrderState>((set) => ({
	formData: {
		name: "",
		callNumber: "",
		address: "",
		// سایر فیلدهایی که در اسکیما دارید را اینجا مقداردهی اولیه کنید
	},
	paymentMethod: "cash",
	setFormData: (data) =>
		set((state) => ({
			formData: { ...state.formData, ...data },
		})),
	setPaymentMethod: (method) => set({ paymentMethod: method }),
}));
