import HomeBrands from "./HomeBrands";
import HomeHead from "./HomeHead";
import Homeinfo from "./Homeinfo";
import HomeSwiperBenz from "./HomeSwiperBenz";

function HomeComponent() {
	return (
		<div>
			<HomeHead />
			<Homeinfo />
			<HomeBrands />
			<HomeSwiperBenz />
		</div>
	);
}

export default HomeComponent;
