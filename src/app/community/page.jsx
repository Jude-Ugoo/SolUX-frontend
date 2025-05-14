"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

const collections = new Array(9).fill({
  title: "Generate a wallet UI that explains seedphrase with...",
  category: "Authentication Series",
});

const Community = () => {
  const router = useRouter();

  return (
    <div className="w-full select-none bg-white min-h-screen">
      <Header/>

      {/* Banner */}
      <div className="relative w-full h-40 md:h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#030103] to-[#00FF94] opacity-10"></div>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            From Prompt to Portfolio
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Monetize your design genius
          </p>
        </div>
      </div>

      {/* Page title */}
      <div className="max-w-7xl mx-auto p-5">
        <h2 className="text-2xl font-bold mb-2">Community collections</h2>
        <p className="text-gray-600 mb-4">
          Explore UI design made by prompt from the SolUX Community. Grab your
          chance to be featured, submit your collections.
        </p>

        {/* Filter button */}
        <div className="mb-6">
          <Button className="border border-gray-300 bg-white text-black">
            Filter
          </Button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-xl overflow-hidden flex flex-col"
            >
              <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-md border" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-base mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex gap-2 mt-auto mb-4">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-sm px-3"
                  >
                    Info
                  </Button>
                  <Button
                    variant="default"
                    className="bg-black text-white text-sm px-3"
                  >
                    Generate Variations
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  <span>{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
