import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const CardWrapper = ({ children }: Props) => (
	<div className="flex-1 relative min-h-64 xl:h-110">
		<div className="absolute inset-0 rounded-xl shadow-lg border border-slate-700 overflow-hidden bg-white">
			{children}
		</div>
	</div>
);

export default CardWrapper;
