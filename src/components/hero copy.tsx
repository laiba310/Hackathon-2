import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row font-IntegralCF justify-center items-center m-auto text-black relative bg-[#F2F0F1] w-full h-auto gap-6 px-4">
      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center lg:pl-24 sm:pl-0 m-auto z-10"> {/* Added z-10 here */}
        <h1 className="font-IntegralCF w-full sm:w-[577px] sm:ml-2 text-[40px] sm:text-[64px] font-extrabold sm:text-left tracking-tight">
          FIND CLOTHES
        </h1>
        <h1 className="font-IntegralCF w-full sm:w-[577px] sm:ml-2 text-[40px] sm:text-[64px] font-extrabold  sm:text-left tracking-tight">
          THAT MATCHES
        </h1>
        <h1 className="font-IntegralCF w-full sm:w-[577px] sm:ml-2 text-[40px] sm:text-[64px] font-extrabold sm:text-left tracking-tight">
          YOUR STYLE
        </h1>
        <p className="font-Satoshi text-[14px] sm:text-[16px] text-black/60 font-normal leading-[22px] text-left tracking-tight">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        {/* Button */}
        <Link href="/casual">
        <button className="mt-4 mb-3 w-[270px] h-[52px] bg-black text-white py-3 rounded-[100px] transition-transform duration-500 ease-in-out hover:scale-110 hover:bg-gray-800">Shop
        </button></Link> 
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-auto relative z-0"> {/* Added z-0 here */}
        <Image
          src="/Rectangle 4.png"
          alt="Hero Image"
          layout="responsive" // Ensure image is responsive
          width={800} // Image width
          height={600} // Image height
          objectFit="contain" // Ensures image is contained and scales properly
          className="object-center" // Ensures the image is centered
        />
      </div>
    </div>
  );
};

export default Hero;
