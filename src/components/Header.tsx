"use client";

import { ClerkLoaded, useUser, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingCart, Package2Icon, Search } from "lucide-react";
import { useState } from "react";
import useBasketStore from "../../store/store";
import NavItems from "./navitems";
import MobileNav from "./mobilenav";

function Header() {
  const { user } = useUser();
  const [searchOpen, setSearchOpen] = useState(false); // Toggle state for search bar in small screens
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header>
      {/* Promo Banner */}
      <div className="bg-black w-full h-[48px] flex justify-center items-center text-center px-4 text-white">
        <p className="text-sm">Sign up and get 20% off your first order.</p>
        <Link href={"/"} className="text-white underline text-sm">
          Shop Now
        </Link>
      </div>

      {/* Header Content */}
      <div className="flex flex-wrap items-center py-2 justify-between lg:px-19">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <MobileNav />
          </div>
           <Link href="/"> <h1 className="font-bold text-2xl  md:text-2xl mt-2 lg:text-4xl  ">SHOP.CO </h1></Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex justify-between items-center space-x-6">
          <NavItems />
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4 relative ">
          {/* Search Bar */}
          {searchOpen && (
            <form className="absolute top-full left-0 w-ful   bg-gray-100 text-gray-800  rounded shadow-lg z-50 md:hidden">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for products"
                  className=" py-2  pl-4  rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                >
                  <Search />
                </button>
              </div>
            </form>
          )}

          {/* Visible Search Bar for Medium and Larger Screens */}
          <form className="hidden md:flex items-center relative w-full max-w-lg"
                    action="/search"

          >

            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="w-full py-2 pl-4 pr-10 rounded border focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              <Search />
            </button>
          </form>

          {/* Search Icon Toggle for Small Screens */}
          <button
            className="md:hidden flex items-center justify-center text-gray-800 p-2 rounded bg-gray-200 hover:bg-gray-300 transition-transform"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search />
          </button>

          {/* Basket */}
          <Link
            href="/basket"
            className="relative flex items-center rounded transition-transform duration-300 transform hover:scale-110 active:scale-125"
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          </Link>

          {/* User Authentication */}
          <ClerkLoaded>
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/order"
                  className="flex items-center rounded transition-transform duration-300 transform hover:scale-110 active:scale-125"
                >
                  <Package2Icon />
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignedOut>
                <SignInButton>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
