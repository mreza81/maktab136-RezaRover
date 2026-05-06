import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
	title: "رضاروور",
	description: "بزرگترین وارد کننده خودروهای خارجی",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-full flex flex-col">
				<div className="">
					{children}
					<ToastContainer position="top-right" />
				</div>
			</body>
		</html>
	);
}
