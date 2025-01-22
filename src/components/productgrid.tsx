"use client"

import { Product } from "../../sanity.types";
import { AnimatePresence, motion } from "framer-motion"; // Ensure this is correctly installed and imported
import ProductThumb from "./productythumb"; // Import your component

function ProductGrid({ products }: { products: Product[] }) {
  return (
<div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:pr-[6rem] lg:pr-[3rem] sm:justify-items-center sm:items-center">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb key={product._id} product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

export default ProductGrid;
