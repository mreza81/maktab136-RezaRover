import { Suspense } from "react";
import Homebaner from "./homebaner";
import HomeBrands from "./HomeBrands";
import HomeHead from "./HomeHead";
import Homeinfo from "./Homeinfo";
import HomeSwiperBenz from "./HomeSwiperBenz";
import HomeSwiperBmw from "./HomeSwiperBmw";
import HomeSwiperWeblog from "./homeSwiperWeblog";

function HomeComponent() {
	return (
		<>
			<HomeHead />
			<Homeinfo />
			<Suspense fallback={null}>
				<HomeBrands />
			</Suspense>
			<Suspense fallback={null}>
				<HomeSwiperBenz />
			</Suspense>
			<Suspense fallback={null}>
				<HomeSwiperBmw />
			</Suspense>
			<Suspense fallback={null}>
				<Homebaner />
			</Suspense>
			<HomeSwiperWeblog />
		</>
	);
}

export default HomeComponent;
