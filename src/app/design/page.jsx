"use client";

import Header from "@/components/header";
import Seperator from "@/components/seperator";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { solflareOnboardingData, data, appOnboardingMap } from "@/utils/data";
import ImageCard from "@/components/ImageCard";
import phantomBanner from "@/assets/images/phantom_banner.png";
import { useSearchParams } from "next/navigation";

const DesignPageContent = () => {
  const [activeTab, setActiveTab] = useState("Apps");
  const [designData, setDesignData] = useState(null);
  const [onboardingScreens, setOnboardingScreens] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const designId = searchParams.get("id");
    if (designId) {
      const selectedDesign = data.find(
        (item) => item.id === parseInt(designId)
      );
      if (selectedDesign) {
        setDesignData(selectedDesign);
        // Get the appropriate onboarding data for this design
        const appOnboardingData =
          appOnboardingMap[selectedDesign.id] || solflareOnboardingData;
        setOnboardingScreens(appOnboardingData);
      }
    } else {
      // Default to first item if no ID is provided
      setDesignData(data[0]);
      setOnboardingScreens(appOnboardingMap[1] || solflareOnboardingData);
    }
  }, [searchParams]);

  const tabs = ["Apps", "Screens", "UI Elements", "Flows", "Case Study"];

  if (!designData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white min-h-[100vh]">
      <Header appPage={true} />
      <Seperator />

      {/* Banner */}
      <div className="w-full px-[5%] mt-6">
        <div className="flex pl-5 bg-[#FAFAFA] h-[124px] rounded-[8px] mb-7">
          {/* App Info */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-[65px] h-[65px] rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={designData.logo}
                alt={`${designData.name} Logo`}
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </div>
            <div className="items-center">
              <h2 className="text-[14px] font-[500] text-[#121212] leading-[14px] font-inter">
                {designData.name}
              </h2>
              <p className="text-[12px] text-[#707070] font-[500] leading-[14px] font-inter mt-1">
                {designData.description}
              </p>
              <p className="text-[10px] font-[500] mt-1 text-[#707070] leading-[14px]">
                {designData.tag} · Web3 wallet
              </p>
            </div>
          </div>

          <div className="flex flex-1 justify-end">
            <Image
              src={phantomBanner}
              alt={`${designData.name} Banner`}
              objectFit="contain"
            />
          </div>
        </div>

        {/* Platform Info */}
        <div className="flex flex-col mb-8">
          <span className="text-[12px] text-[#707070] font-inter font-[500] leading-[14px] mb-2">
            Platform
          </span>
          <span className="text-[20px] font-[600] font-inter leading-[16px] text-[#4f4f4f] mb-2">
            {" "}
            iOS, Android, Web{" "}
          </span>
          <div className="flex gap-3">
            <div className="px-3.5 py-2 bg-[#121212] text-[#EDEDED] rounded-full text-[12px] font-[500] font-inter leading-[14px] text-center">
              Save
            </div>

            <div className="px-3.5 py-2 border border-black-100 rounded-full text-[12px] font-[500] font-inter leading-[14px] text-center">
              Rate
            </div>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 mb-10">
          {tabs.map((tab) => (
            <div key={tab} className="flex items-center gap-2">
              {tab === "Case Study" ? (
                <>
                  <span className="relative text-lg lg:text-[24px] font-medium lg:font-[500] leading-tight lg:leading-[32px] text-[#D1D1D1E7]">
                    {tab}
                  </span>
                  <span className="text-[12px] text-[#707070]">
                    Coming Soon
                  </span>
                </>
              ) : (
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-lg lg:text-[24px] font-medium lg:font-[500] leading-tight lg:leading-[32px] ${
                    activeTab === tab ? "text-[#4f4f4f]" : "text-[#D1D1D1E7]"
                  }`}
                >
                  <span>{tab}</span>
                  {activeTab === tab && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#4f4f4f]"></span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Onboarding Section */}
        <div className="mb-4">
          <h2 className="text-[#121212] font-[600] font-inter text-[20px] leading-[16px] mb-2 ">
            Onboarding
          </h2>
          <span className="font-[inter] font-[500] text-[12px] leading-[14px] text-[#707070]">
            {onboardingScreens.length} Screens
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-hide pb-4">
          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-10 w-max">
            {onboardingScreens.map((item, i) => (
              <div
                key={i}
                className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px] lg:min-w-[260px] h-auto"
              >
                <ImageCard image={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DesignPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignPageContent />
    </Suspense>
  );
};

export default DesignPage;
