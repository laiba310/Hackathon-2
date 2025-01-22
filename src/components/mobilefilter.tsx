"use client";

import {
  Check,
  ChevronRight,
  ChevronUp,
  SlidersHorizontal,

} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export default function Filter() {
  const [filters, setFilters] = useState<{
    category: string;
    priceRange: [number, number];
    colors: string[];
    sizes: string[];
  }>({
    category: "",
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  });

  // Update Colors
  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    setFilters({ ...filters, colors: newColors });
  };

  // Update Sizes
  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    setFilters({ ...filters, sizes: newSizes });
  };

  // Update Price Range
  const handlePriceChange = (range: number[]) => {
    if (range.length === 2) {
      setFilters({ ...filters, priceRange: [range[0], range[1]] });
    }
    <SlidersHorizontal className="w-5 h-5" />
};

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-3 mt-3">Filters</h2>
            </div>
          </SheetHeader>
          <div className="p-4 w-full h-auto">
            <div className="border-b-gray-200 border-b mb-4"></div>

            {/* Category Filter */}
            <div className="mb-4">
              <Link href="/t-shirt" className="flex justify-between items-center mb-2">
                <div className="flex flex-wrap opacity-55">T-shirts</div>
                <ChevronRight className="opacity-50" />
              </Link>
              <Link href="/short" className="flex justify-between items-center mb-2">
                <div className="flex flex-wrap opacity-55">Shorts</div>
                <ChevronRight className="opacity-50" />
              </Link>
              <Link href="/t-s" className="flex justify-between items-center mb-2">
                <div className="flex flex-wrap opacity-55">Shirts</div>
                <ChevronRight className="opacity-50" />
              </Link>
              <Link href="/hoodie" className="flex justify-between items-center mb-2">
                <div className="flex flex-wrap opacity-55">Hoodie</div>
                <ChevronRight className="opacity-50" />
              </Link>
            </div>

            <div className="border-b-gray-200 border-b mb-4"></div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg mb-2">Price Range</h4>
                <ChevronUp />
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([0, parseInt(e.target.value, 10)])
                }
                className="w-full bg-black"
              />
              <p className="mt-2">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </p>
            </div>

            <div className="border-b-gray-200 border-b mb-4"></div>

            {/* Colors Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg mb-2">Colors</h4>
                <ChevronUp />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["#00C12B", "#F50606", "#F5DD06", "#F57906", "#06CAF5", "#063AF5", "#7D06F5", "#F506A4", "#000000"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`w-10 h-10 rounded-full inline-block mb-2 border relative ${filters.colors.includes(color) ? "border-black" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    >
                      {filters.colors.includes(color) && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          <Check />
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="border-b-gray-200 border-b mb-4"></div>

            {/* Sizes Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg mb-2">Sizes</h4>
                <ChevronUp />
              </div>
              {["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"].map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`opacity-50 text-xs w-[96px] h-[34px] rounded-3xl border border-gray-300 mr-2 mb-2 cursor-pointer ${filters.sizes.includes(size) ? "bg-black text-white" : "bg-[#F0F0F0] text-black"}`}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
