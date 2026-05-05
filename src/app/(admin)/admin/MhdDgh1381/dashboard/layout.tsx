import AdminHeader from "@/layout/adminLayout/adminHeader";
import Sidebar from "@/layout/adminLayout/sidebar";

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
