`use client`;
import Image from "next/image";

function HomeBrands() {
	return (
		<div className="flex flex-col items-center justify-center gap-16 my-10 px-5">
			<div className="text-primary text-2xl md:text-4xl lg:text-5xl font-bold">
				برندهای ما
			</div>
			<div className="grid grid-cols-2  gap-x-7  md:grid-cols-4 lg:grid-cols-9  xl:gap-x-22  p-2">
				<Image
					src="/assets/images/BMW_logo_gray.webp"
					alt="Bmw"
					width={80}
					height={80}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>

				<Image
					src="/assets/images/120756704.webp"
					alt="Porsche"
					width={90}
					height={90}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/Maserati512x512-min-300x300.webp"
					alt="maserati"
					width={90}
					height={90}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/هیوندا.webp"
					alt="hyundai"
					width={90}
					height={110}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/560x560.webp"
					alt="nissan"
					width={90}
					height={90}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/kia.webp"
					alt="kia"
					width={100}
					height={110}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>

				<Image
					src="/assets/images/toyota.webp"
					alt="toyota"
					width={90}
					height={90}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/lexus.webp"
					alt="lexus"
					width={80}
					height={90}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
				<Image
					src="/assets/images/Mercedes-Logo.webp"
					alt="Benz"
					width={80}
					height={80}
					className="transition-transform duration-600 hover:scale-125 hover:cursor-pointer spin-y"
				/>
			</div>
		</div>
	);
}

export default HomeBrands;
