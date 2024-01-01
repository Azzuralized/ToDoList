
import React from 'react';
import Background from './image/Background.svg';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative ">
      <Image src={Background} className="hero min-h-screen" />


      <div className="absolute inset-0 flex items-center justify-center text-center text-neutral-content">
        <div className="max-w-md mb-[200px]">
          <h1 className="mb-[22px] text-[82px] text-[#000000] font-extrabold">To-Do-List</h1>
          <h2 className="mb-5 text-[32px] text-[#000000] font-bold">By Farhan Azzura</h2>

        </div>
      </div>

    </div>
  );
};

export default Hero;