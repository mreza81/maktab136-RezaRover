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

			<HomeBrands />
			<HomeSwiperBenz />
			<HomeSwiperBmw />
			<Homebaner />
			<HomeSwiperWeblog />
		</>
	);
}

export default HomeComponent;
