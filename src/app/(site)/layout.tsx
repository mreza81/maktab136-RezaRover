import Footer from "@/layout/siteLayout/footer/footer";
import Header from "@/layout/siteLayout/header/components/header";
import { Suspense } from "react";

export default function homeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header></Header>
			<main>{children}</main>
			<Footer />
		</div>
	);
}
