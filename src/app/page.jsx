"use client";

import DesignCard from "@/components/DesignCard";
import Filter from "@/components/Filter";
import { Icons } from "@/components/Icons";
import Chip from "@/components/chips";
import Register from "@/components/Register";
import Seperator from "@/components/seperator";
import { appsData, data } from "@/utils/data";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
// import WaitlistPage from './waitlist/page'
import Header from "@/components/header";

const Home = () => {
  const [activeApp, setActiveApp] = useState(appsData[0]);
  const [activeTab, setActiveTab] = useState("Apps");
  const router = useRouter();

  const tabs = ["Apps", "Screens", "UI Elements", "Flows"];

  return (
    <div className="w-full select-none bg-white min-h-[100vh]">
      <Header />
      <div className="w-full px-[5%] mt-4">
        <div className="w-full my-[33px] flex items-center text-center">
          <span className="text-[40px] font-[700] leading-[48px] text-[#121212] mr-3 pr-3 text-center border-r border-r-[#B0B0B0]">
            Explore
          </span>
          <div className="flex items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-[24px] font-[500] leading-[32px] ${
                  activeTab === tab ? "text-[#4f4f4f]" : "text-[#D1D1D1E7]"
                }`}
              >
                <span>{tab}</span>
                {activeTab === tab && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#4f4f4f]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center gap-3 overflow-x-scroll scrollbar-hide">
          {appsData.map((app, i) => (
            <Chip isActive={app === activeApp} key={app} title={app} />
          ))}
        </div>

        <div className="mt-[60px]">
          <div className="w-full gap-2 grid lg:grid-cols-4 md:grid-cols-3">
            {data.map((app, i) => (
              <DesignCard key={i} design={app} />
            ))}
          </div>
        </div>
        <Register />
      </div>

      {/* <WaitlistPage/> */}
    </div>
  );
};

export default Home;
