"use client";
import { useRouter } from "next/navigation";

function SubmitBtn(cartItems: any) {
	const disabledButton = cartItems.cartItems.length == 0;
	const router = useRouter();

	return (
		<button
			className={`w-full bg-[#7c3aed] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#6d28d9] transition-all transform active:scale-[0.98] shadow-lg shadow-purple-100 
									${disabledButton ? `opacity-20 disabled  ` : `enabled cursor-pointer`}`}
			disabled={disabledButton}
			onClick={() => {
				router.push("/checkout");
			}}
		>
			تایید و تکمیل سفارش
		</button>
	);
}

export default SubmitBtn;
