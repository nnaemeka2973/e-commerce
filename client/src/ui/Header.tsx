import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FiShoppingBag, FiStar, FiUser, FiPackage, FiHome } from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import Container from "./Container";
import { config } from "../../config";
import { getData } from "../lib";
import type { CategoryProps, ProductProps } from "../../type";
import ProductCard from "./ProductCard";
import { store } from "../lib/store";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const { cartProduct, favoriteProduct, currentUser } = store();

  const location = useLocation();
const isActive = (path: string) => location.pathname === path;


  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endpoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchData();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchData();
  }, []);

  // Filter products based on search text
  useEffect(() => {
    const filtered = products.filter((item: ProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchText]);

  return (
    <div className="w-full bg-white md:sticky md:top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 flex items-center 
      justify-between px-4 lg:px-0 relative">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo1} alt="logo" className="w-44" />
        </Link>

        {/* SearchBar */}
        <div className="relative w-full max-w-xl mx-4 md:mx-0">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300
             text-gray-900 text-base placeholder-gray-400 
             shadow-sm focus:outline-none focus:ring-2
              focus:ring-sky-500 focus:border-sky-500 px-4 
              py-2 transition-all duration-200"
          />
          {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className="absolute top-2.5 right-4 text-xl text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-200"
            />
          ) : (
            <IoSearchOutline className="absolute top-2.5 right-4 text-xl text-gray-400" />
          )}
        </div>

        {/* Menubar Icons */}
        <div className="flex items-center gap-x-6 text-2xl">
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt="profileImg"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FiUser className="hover:text-sky-600 duration-200 cursor-pointer" />
            )}
          </Link>

          <Link to={"/favorite"} className="relative block">
            <FiStar className="hover:text-sky-600 duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-600 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {favoriteProduct?.length > 0 ? favoriteProduct?.length : "0"}
            </span>
          </Link>

          <Link to={"/cart"} className="relative block">
            <HiOutlineShoppingCart className="hover:text-sky-600 duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-600 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {cartProduct?.length > 0 ? cartProduct?.length : "0"}
            </span>
          </Link>
        </div>

        {/* Search Results Dropdown */}
        {searchText && (
          <div className="absolute left-0 top-20 w-full max-w-7xl mx-auto px-4 py-5 bg-white z-50 overflow-y-auto text-black shadow-lg rounded-xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {filteredProducts.map((item: ProductProps) => (
                  <ProductCard key={item?._id} item={item} setSearchText={setSearchText} />
                ))}
              </div>
            ) : (
              <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-300 rounded-md text-center">
                <p className="text-base sm:text-lg text-gray-700">
                  No results for{" "}
                  <span className="underline decoration-red-500 text-red-600 font-semibold">
                    {searchText}
                  </span>
                  . Try another keyword.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category & Bottom Navigation */}
      <div className="w-full bg-blue-950 text-white">
        <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
          {/* Category Menu */}
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md border border-gray-400 hover:border-white py-1.5 px-3 font-semibold text-gray-300 hover:text-white">
              Select Category <FaChevronDown className="text-base mt-1" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems 
              anchor="bottom end"
               className="w-52 origin-top-right rounded-xl border
                border-white/30 bg-white/20 backdrop-blur-xl
                 shadow-lg p-1 text-sm 
              focus:outline-none z-50 overflow-y-auto 
              hide-scrollbar max-h-80" >

                {categories.map((item: CategoryProps) => (
                  <MenuItem key={item?._id}>
                    {({ active }) => (
                      <Link
                        to={`/category/${item?._base}`}
                        className={`flex w-full items-center gap-2 rounded-lg py-2 px-3
                           data-focus:bg-white/30 
                          tracking-wide border border-transparent
                           hover:border-sky-400 " 
                           ${
                          active
                            ? "border-sky-400 bg-sky-400 text-sky-600"
                            : "border-transparent text-black"
                        }`}
                      >
                        <img
                          src={item?.image}
                          alt="categoryImage"
                          className="w-6 h-6 rounded-md"
                        />
                        {item?.name}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>

          {/* Bottom Navigation */}
          {bottomNavigation.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className="uppercase hidden md:inline-flex text-sm 
              font-semibold text-whiteText/90
               hover:text-white duration-200 relative
                overflow-hidden group"
            >
              {title}
              <span className="inline-flex w-full h-px bg-white
               absolute bottom-0 left-0 transform -translate-x-[105%]
                group-hover:translate-x-0 duration-300" />
            </Link>
          ))}
        </Container>
      </div>

    {/* Mobile & Medium Bottom Navigation */}
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t
 border-gray-200 md:hidden">
  <div className="flex items-center justify-around py-2">

    {/* Home */}
    <Link
      to="/"
      className={`flex flex-col items-center text-xs transition-all 
        duration-200
        ${isActive("/") ? "text-sky-600" : "text-blue-950 hover:text-sky-600"}`}
    >
      <FiHome className="text-xl mb-0.5" />
      Home
    </Link>

    {/* Shop */}
    <Link
      to="/product"
      className={`flex flex-col items-center text-xs transition-all duration-200
        ${isActive("/product") ? "text-sky-600" : "text-blue-950 hover:text-sky-600"}`}
    >
      <FiShoppingBag className="text-xl mb-0.5" />
      Shop
    </Link>

    {/* Cart */}
    <Link
      to="/cart"
      className={`relative flex flex-col items-center text-xs transition-all duration-200
        ${isActive("/cart") ? "text-sky-600" : "text-blue-950 hover:text-sky-600"}`}
    >
      <HiOutlineShoppingCart className="text-xl mb-0.5" />
      Cart
      {cartProduct?.length > 0 && (
        <span className="absolute -top-1 right-3 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          {cartProduct.length}
        </span>
      )}
    </Link>

    {/* Orders */}
    <Link
      to="/orders"
      className={`flex flex-col items-center text-xs transition-all duration-200
        ${isActive("/orders") ? "text-sky-600" : "text-blue-950 hover:text-sky-600"}`}
    >
      <FiPackage className="text-xl mb-0.5" />
      Orders
    </Link>

    {/* Account */}
    <Link
      to="/profile"
      className={`flex flex-col items-center text-xs transition-all duration-200
        ${isActive("/profile") ? "text-sky-600" : "text-blue-950 hover:text-sky-600"}`}
    >
      <FiUser className="text-xl mb-0.5" />
      Account
    </Link>

  </div>
</div>



    </div>
  );
};

export default Header;
