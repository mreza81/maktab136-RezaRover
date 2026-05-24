import type { Metadata } from "next";

import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryProvider } from "./providers";

export const metadata: Metadata = {
	title: "رضاروور | وارد کننده خودروهای خارجی",
	description: "رضاروور بزرگترین وارد کننده خودروهای خارجی",

	icons: {
		icon: "/assets/images/5a1465fa-9e6b-4f2d-9751-bf48e4568742.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-full flex flex-col">
				<div>
					<ReactQueryProvider>{children}</ReactQueryProvider>
					<ToastContainer position="top-right" />
				</div>
			</body>
		</html>
	);
}
