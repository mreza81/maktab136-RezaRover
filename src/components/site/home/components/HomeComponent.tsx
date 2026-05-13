import HomeBrands from "./HomeBrands";
import HomeHead from "./HomeHead";
import Homeinfo from "./Homeinfo";
import HomeSwiperBenz from "./HomeSwiperBenz";
import HomeSwiperBmw from "./HomeSwiperBmw";

function HomeComponent() {
	return (
		<div>
			<HomeHead />
			<Homeinfo />
			<HomeBrands />
			<HomeSwiperBenz />
			<HomeSwiperBmw />
		</div>
	);
}

export default HomeComponent;
