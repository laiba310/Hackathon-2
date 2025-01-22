import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Navitems from "./navitems";
import Link from "next/link";

const MobileNav = () => {
  return (
          <nav className="md:hidden">
            <Sheet>
              <SheetTrigger className="">
                <Image
                  src="/menu.png"
                  alt="Menu"
                  width={24}
                  height={24}
                  className="cursor-pointe ml[5rem]r"
                />
              </SheetTrigger>
      
              <SheetContent className="flex flex-col gap-6 bg-white">
              <Link href="/" className="font-extrabold font-integral text-2xl md:text-3xl lg:text-4xl md:ml-[6rem] mr-[2rem]">SHOP.CO</Link>
      
                <Separator className="border border-gray-50" />
                <Navitems />
              </SheetContent>
            </Sheet>
          </nav>
        );
      };
      
  

export default MobileNav;
