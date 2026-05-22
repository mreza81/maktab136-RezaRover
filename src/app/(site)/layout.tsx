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
			<main>
				<Suspense fallback={null}>
					<Header />
				</Suspense>
				{children}
				<Footer />
			</main>
		</div>
	);
}
