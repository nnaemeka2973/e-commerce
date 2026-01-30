import { useEffect, useState } from 'react'
import Container from './Container';
import { config } from '../../config';
import { getData } from '../lib';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import type { CategoryProps } from '../../type';

interface Props {
  text: string;
  className?: string;
}



const Title = ({ text, className }: Props) => {
  const newClassName = twMerge("text-4xl font-bold", className);
  return <h2 className={newClassName}>{text}</h2>;
};

const PopularCategories = () => {

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

  return (
     <Container>
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Popular categories" />
          <Link
            to={"/category/tvAndAudio"}
            className="font-medium relative 
            group overflow-hidden"
          >
            View All Categories{" "}
            <span className="absolute bottom-0 left-0 w-full block h-px
             bg-gray-600 -translate-x-full 
             group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <div className="w-full h-px bg-gray-200 mt-3" />
      </div>
      <div className="grid
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-6
    gap-4
    sm:gap-5
    md:gap-6">
        {categories.map((item: CategoryProps) => (
          <Link
            to={`/category/${item?._base}`}
            key={item?._id}
            className="bg-white
  rounded-xl
  shadow
  hover:shadow-lg
  p-3
  sm:p-4
  md:p-5
  flex
  flex-col
  items-center
  gap-2
  sm:gap-3
  transition    "
          >
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full
    h-24
    sm:h-28
    md:h-32
    object-contain
    duration-300"
            />
            <div className="text-sm md:text-base font-semibold text-center">
              <p className="text-sm md:text-base font-bold">{item?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default PopularCategories