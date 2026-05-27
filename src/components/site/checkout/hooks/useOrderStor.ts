import { createOrderScheemaType } from "@/scheema/createOrder";
import { create } from "zustand";

interface OrderState {
	// نام این بخش را به shippingAddress تغییر دادیم
	shippingAddress: {
		name: string;
		phone: string;
		address: string;
	};
	paymentMethod: string;
	setShippingAddress: (
		data: Partial<{ name: string; phone: string; address: string }>,
	) => void;
	setPaymentMethod: (method: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
	shippingAddress: {
		name: "",
		phone: "",
		address: "",
	},
	paymentMethod: "cash",

	// آپدیت کردن بخشی از آدرس
	setShippingAddress: (data) =>
		set((state) => ({
			shippingAddress: { ...state.shippingAddress, ...data },
		})),

	setPaymentMethod: (method) => set({ paymentMethod: method }),
}));
