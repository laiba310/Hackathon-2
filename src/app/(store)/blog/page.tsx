import FilterOnly from "@/components/filter";
import Filter from "@/components/mobilefilter";
import ProductView from "@/components/productsview";
import { getAllProducts } from "@/sanity/lib/product/getAllProduct";
import Link from "next/link";

export default async function Blog() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center px-[6rem] space-x-2 text-lg py-4">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="text-gray-500">/</span>
        <span className="font-bold text-black">Casual</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start md:p-4">
        <div className="flex w-full">
          {/* Desktop Filter Section */}
          <div className="hidden lg:flex flex-1 md:pl-[1.5rem] lg:pl-[3rem] mt-9">
            <FilterOnly />
          </div>

          {/* Products Section */}
          <div className="flex-3">
            <div className="flex md:justify-between">
            <h1 className="mt-4  md:mt-8 md:text-4xl  text-2xl font-extrabold">Casual</h1>

            {/* Sorting Options */}
            <div className="flex flex-wrap  md:mr-[5rem]">
              <p className="text-end text-sm text-gray-500 mt-6 md:mt-8  ">
                Showing 1-{products.length} of {products.length} Products
              </p>
              <select className="hover:border-none rounded-md hidden md:block md:mt-2 focus:outline-none">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div></div>
<div>
            {/* Product View */}
            <ProductView products={products} />
          </div>
          </div>
          {/* Mobile Filter Section */}
          <div className="lg:hidden mt-4 h-0">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
}
