"use client";

import WaitlistPage from "./waitlist/page";
import UIXGeneratorDeepseek from "./ui-generator-deepseek/page";
// import DesignCard from "@/components/DesignCard";
// import Filter from "@/components/Filter";
// import { Icons } from "@/components/Icons";
// import Chip from "@/components/chips";
// import Register from "@/components/Register";
// import Seperator from "@/components/seperator";
// import { appsData, appsDataMobile, data } from "@/utils/data";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "@/components/header";
// import supabase from "@/utils/supabaseClient";
// import { useWallet } from "@solana/wallet-adapter-react";

const Home = () => {
//   const [activeApp, setActiveApp] = useState(appsData[0]);
//   const [activeTab, setActiveTab] = useState("Apps");
//   const router = useRouter();
//   const { publicKey } = useWallet();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       setIsLoading(true);
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();

//         if (session?.user || publicKey) {
//           setIsAuthenticated(true);
//           setIsLoading(false);
//         } else {
//           // Only redirect if we're sure there's no valid session or wallet connection
//           setIsAuthenticated(false);
//           router.push("/login");
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         setIsLoading(false);
//       }
//     };

//     // Add a small delay to ensure wallet state is properly initialized
//     const timer = setTimeout(() => {
//       checkAuth();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [publicKey, router]);

//   // Show loading state if still checking auth
//   if (isLoading) {
//     return (
//       <div className="w-full flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   const tabs = ["Apps", "Screens", "UI Elements", "Flows"];

  return (
    <div className="w-full select-none bg-white min-h-[100vh]">
      {/* <Header />
      <div className="w-full px-4 lg:px-[5%] mt-4">
        <div className="w-full flex flex-col my-4 lg:my-[33px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0">
            <span className="text-[32px] lg:text-[40px] font-bold text-[#121212] lg:mr-3 lg:pr-3 lg:border-r lg:border-r-[#B0B0B0]">
              Explore
            </span>
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
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
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex items-center gap-3 overflow-x-scroll scrollbar-hide pb-4">
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm">
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <Icons.filter size={18} color="#4F4F4F" />
          </button>

          <div className="hidden lg:flex items-center gap-3">
            {appsData.map((app, i) => (
              <Chip
                key={app}
                title={app}
                isActive={app === activeApp}
                handleClick={() => setActiveApp(app)}
              />
            ))}
          </div>

          <div className="flex lg:hidden items-center gap-3">
            {appsDataMobile.map((app, i) => (
              <Chip
                key={app}
                title={app}
                isActive={app === activeApp}
                handleClick={() => setActiveApp(app)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-[60px]">
          <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((app, i) => (
              <DesignCard key={i} design={app} />
            ))}
          </div>
        </div>
      </div> */}

      {/* <WaitlistPage/> */}
      <UIXGeneratorDeepseek />
      {/* <UIXGeneratorDeepsite/> */}
      {/* <UIXGeneratorHuggingFace/> */}
      {/* <UIXGenerator/> */}
    </div>
  );
};
export default Home;
