import Footer from "@/layout/siteLayout/footer/footer";
import Header from "@/layout/siteLayout/header/components/header";

export default function homeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<main>
				<Header />
				{children}
				<Footer />
			</main>
		</div>
	);
}
