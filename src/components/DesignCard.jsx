'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DesignCard = ({ design }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col rounded-xl">
      <div
        onClick={() => router.push(`/design`)}
        className="bg-[#FAFAFA] cursor-pointer rounded-xl flex items-center justify-center w-full py-6"
      >
        <div className="mt-3">
          <Image
            className="w-full h-auto object-cover"
            alt={design.name}
            src={design.image}
			wdth={300}
			height={300}
          />
        </div>
      </div>

	  <div className="flex items-center gap-3">
        {/* App Icon */}
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
          <Image
            src={design.icon}
            alt={`${design.name} Icon`}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Name + Description */}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{design.name}</h3>
          <p className="text-sm text-gray-700">{design.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
