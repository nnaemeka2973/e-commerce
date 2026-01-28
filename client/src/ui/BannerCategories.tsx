
import { useEffect, useState } from "react"
import { config } from "../../config";
import { getData } from "../lib";
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import type { CategoryProps } from "../../type";
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';



const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-5 m-auto h-10 w-10 flex
       items-center justify-center bg-gray-100 rounded-full border
        border-gray-200 hover:bg-gray-950 hover:text-white
         duration-200"
      aria-label="Next"
    >
      <HiArrowRight className="text-base" />
    </button>
  );
};


const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-5 m-auto h-10 w-10 flex 
      items-center justify-center bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-950 hover:text-white duration-200"
      aria-label="Next"
    >
      <HiArrowLeft className="text-base" />
    </button>
  );
};
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

const BannerCategories = () => {
const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  return <Carousel  
   responsive={responsive}
      infinite={true}
      autoPlay={true}
      transitionDuration={1000}
      className="flex flex-row p-4 max-w-7xl mx-auto lg:px-0 relative"
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
        {categories.map((item: CategoryProps) => (
        <Link
          key={item?._id}
          to={`category/${item?._base}`}
          className="flex items-center gap-x-2 p-1 border
           border-gray-100
           mr-1 flex-1 rounded-md hover:border-sky-500 hover:shadow-lg"
        >
          <img
            src={item?.image}
            alt="categoryImage"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="text-sm font-semibold"> {item?.name}</p>
        </Link>
      ))}
    
  </Carousel>
}

export default BannerCategories