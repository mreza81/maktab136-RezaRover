import HomeBrands from "./HomeBrands";
import HomeHead from "./HomeHead";
import Homeinfo from "./Homeinfo";
import HomeSwiperBenz from "./HomeSwiperBenz";
import HomeSwiperBmw from "./HomeSwiperBmw";

function HomeComponent() {
	return (
		<>
			<HomeHead />
			<Homeinfo />
			<HomeBrands />
			<HomeSwiperBenz />
			<HomeSwiperBmw />
		</>
	);
}

export default HomeComponent;
