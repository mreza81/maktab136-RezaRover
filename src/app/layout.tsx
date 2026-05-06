import type { Metadata } from "next";

import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryProvider } from "./providers";
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
				<div>
					<ReactQueryProvider>{children}</ReactQueryProvider>
					<ToastContainer position="top-right" />
				</div>
			</body>
		</html>
	);
}
