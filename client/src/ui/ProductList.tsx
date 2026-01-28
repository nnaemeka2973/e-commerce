import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import Pagination from './Pagination';

interface Props {
  text: string;
  className?: string;
}



const Title = ({ text, className }: Props) => {
  const newClassName = twMerge("text-4xl font-bold", className);
  return <h2 className={newClassName}>{text}</h2>;
};

const ProductList = () => {
  return (
    <Container>
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Top Selling Products" />
          <Link to={"/product"}>View All Products</Link>
        </div>
        <div className="w-full h-px bg-gray-200 mt-2" />
      </div>
      {/* Pagination */}
      <Pagination />
    </Container>
  )
}

export default ProductList