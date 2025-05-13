"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DesignCard = ({ design }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-xl">
      <div
        onClick={() => router.push(`/design?id=${design.id}`)}
        className="bg-[#FAFAFA] cursor-pointer rounded-xl flex items-center justify-center w-full py-6"
      >
        <div className="mt-3 ">
          <Image
            className="md:h-[600px] md:w-[384px] lg:w-full object-contain"
            alt={design.name}
            src={design.image}
            // wdth={100}
            // height={100}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2">
        {/* App Icon */}
        <div className="w-[65px] h-[65px] rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={design.logo}
            alt={`${design.name} Icon`}
            width={100}
            height={100}
            objectFit="contain"
          />
        </div>

        {/* Name + Description */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{design.name}</h3>
          <p className="text-[12px] font-[500] leading-[14px] text-[#707070]">
            {design.description}
          </p>
          <span className="bg-[#9786E426] text-center text-[10px] font-[500] font-inter text-[#000000] w-12">
            {design.tag}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DesignCard;
