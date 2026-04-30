`use client`;
import Image from "next/image";

function HomeBrands() {
	return (
		<div className="flex flex-col items-center justify-center gap-16 my-10 ">
			<div className="text-primary text-2xl md:text-4xl lg:text-5xl font-bold">
				برندهای ما
			</div>
			<div className="grid grid-cols-2 gap-x-7  md:grid-cols-9  xl:gap-x-14  bg-yellow-300 p-2">
				<Image
					src="/assets/images/BMW_logo_gray.svg.png"
					alt="Bmw"
					width={80}
					height={80}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer "
				/>

				<Image
					src="/assets/images/120756704.jpg"
					alt="Porsche"
					width={90}
					height={90}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/Maserati512x512-min-300x300.png"
					alt="maserati"
					width={90}
					height={90}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/هیوندا.png"
					alt="hyundai"
					width={90}
					height={110}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/560x560.webp"
					alt="nissan"
					width={90}
					height={90}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/kia.png"
					alt="kia"
					width={100}
					height={110}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>

				<Image
					src="/assets/images/toyota.png"
					alt="toyota"
					width={90}
					height={90}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/lexus.png"
					alt="lexus"
					width={80}
					height={90}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
				<Image
					src="/assets/images/Mercedes-logo.svg.png"
					alt="Benz"
					width={80}
					height={80}
					className="transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
				/>
			</div>
		</div>
	);
}

export default HomeBrands;
