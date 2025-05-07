"use client";

import React, { useState } from "react";
import { Icons } from "./Icons";
import Search from "./Search";
import FilterBy from "./Dropdowns/FilterBy";
import { useRouter } from "next/navigation";

const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
      <div className="w-full lg:w-auto">
        <ul className="flex flex-wrap lg:flex-nowrap items-center gap-3">
          <li className="py-2 px-3 relative cursor-pointer text-base font-semibold text-gray-700 rounded-sm bg-gray-50">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-5"
            >
              <span>Filter</span>
              <Icons.filter />
            </div>
            {showFilter && <FilterBy closeCard={() => setShowFilter(false)} />}
          </li>
          <li className="py-2 px-3 text-base font-semibold text-gray-700">
            App Shots
          </li>
          <li className="py-2 px-3 text-base font-semibold text-gray-700">
            Websites
          </li>
          <li className="py-2 px-3 text-base font-semibold text-gray-700">
            Extensions
          </li>
          <li
            onClick={() => router.push("/waitlist")}
            className="py-2 px-3 text-base font-semibold text-gray-700 cursor-pointer"
          >
            Waitlist
          </li>
        </ul>
      </div>

      <div className="w-full lg:w-auto">
        <Search otherStyles="w-full lg:w-auto bg-[#F6F6F6]" />
      </div>
    </div>
  );
};

export default Filter;
