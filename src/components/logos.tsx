"use client";
import React from "react";
import Image from "next/image";

export const Logos= () => {
  return (
    <div className="w-full h-full bg-black flex justify-evenly items-center m-auto">
      <div>
        {/* Logo Container */}
        <div className="flex items-center flex-wrap justify-center mt-[4rem] mb-[4rem]  gap-3 md:gap-[2rem] lg:gap-[2.5rem] sm:ml-4 lg:ml-[3rem]">
          {/* Logo 1 */}
          <Image
            src={"/Group (1).png"}
            width={166.5}
            height={33}
            alt="versace logo"
            className="w-[166.5px] h-[33px] "
          />
          {/* Logo 2 */}
          <Image
            src={"/zara-logo-1 1.png"}
            width={91}
            height={38}
            alt="zara logo"
            className="w-[91px] h-[38px]"
          />
          {/* Logo 3 */}
          <Image
            src={"/prada-logo-1 1.png"}
            width={156}
            height={36}
            alt="gucci logo"
            className="w-[156px] h-[36px]"
          />
          {/* Logo 4 */}
          <Image
            src={"/prada-logo-1 1.png"}
            width={194}
            height={32}
            alt="prada logo"
            className="w-[194px] h-[32px]"
          />
          {/* Logo 5 */}
          <Image
            src={"/Group.png"}
            width={207}
            height={33}
            alt="ck logo"
            className="w-[207px] h-[33px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Logos;
