import AdminHeader from "@/layout/adminLayout/adminHeader";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AdminHeader />

			<main>{children}</main>
		</div>
	);
}
