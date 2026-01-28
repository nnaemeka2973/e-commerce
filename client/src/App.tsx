 
import BannerCategories from "./ui/BannerCategories"
import 'react-multi-carousel/lib/styles.css';
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/HighLights";
import PopularCategories from "./ui/PopularCategories";
import ProductList from "./ui/ProductList";
import DiscountedBanner from "./ui/DiscountedBanner";
import Blog from "./ui/Blog";

function App() {
  

  return (
    <main>
      <BannerCategories></BannerCategories>
      <HomeBanner></HomeBanner>
      <Highlights></Highlights>
      <PopularCategories></PopularCategories>
      <ProductList></ProductList>
      <DiscountedBanner></DiscountedBanner>
      <Blog></Blog>

      
      
      
      
      </main>
  )
}

export default App
