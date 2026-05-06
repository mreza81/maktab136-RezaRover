export default function Loading() {
	return (
		<div className="flex gap-2 justify-center items-center h-40">
			<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce"></div>
			<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce delay-150"></div>
			<div className="w-3 h-3 bg-tertialy rounded-full animate-bounce delay-300"></div>
		</div>
	);
}
