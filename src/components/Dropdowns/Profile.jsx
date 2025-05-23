"use client";

import Image from "next/image";
import React, { useState } from "react";
import Avatar from "@/assets/images/Avatar.png";
import { profileActions } from "@/utils/data";
import Seperator from "../seperator";
import { Icons } from "../Icons";
import { useWallet } from "@solana/wallet-adapter-react";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ onLogout }) => {
  const { disconnect } = useWallet();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    if (onLogout) {
      // Use the provided logout function if available
      onLogout();
    } else {
      // Fallback to the local implementation
      try {
        await supabase.auth.signOut();
        if (disconnect) {
          await disconnect();
        }
        router.push("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div className="absolute z-50 bg-white border lg:min-w-[300px] min-w-[250px] border-gray-300 right-0 shadow-lg rounded-lg py-3 lg:top-[120%] top-2">
      <div className="flex items-center gap-3 pb-3 px-6">
        <div className="w-[40px] h-[40px] rounded-full relative">
          <Image
            src={Avatar}
            alt="avatar"
            className="rounded-full"
            width={40}
            height={40}
          />
          <div className="absolute bg-white rounded-full p-1 bottom-0 right-0">
            <span className="bg-success-500 w-2.5 h-2.5 block rounded-full"></span>
          </div>
        </div>
        <div>
          <p className="text-gray-700 whitespace-nowrap font-semibold text-sm">
            Chisom Moriah
          </p>
          <p className="text-gray-700 text-sm">chisom.BONK</p>
        </div>
      </div>
      <Seperator />
      <div className="flex px-6 flex-col gap-3 my-4">
        {profileActions.map((action, i) => (
          <div className="flex items-center gap-4" key={action.name}>
            {action.toggle ? (
              <div className="flex">
                <input
                  onChange={() => setDarkMode(!darkMode)}
                  type="checkbox"
                  id="mode-toggle"
                />
                <label className="toggle-switch" htmlFor="mode-toggle">
                  <Icons.moon
                    className={`absolute left-[21px] moon duration-300 ${
                      darkMode ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Icons.sun
                    className={`absolute left-[4px] sun duration-300 ${
                      darkMode ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </label>
              </div>
            ) : action.img ? (
              <Image
                src={action.img}
                alt={action.name}
                width={17}
                height={17}
              />
            ) : (
              React.createElement(Icons[action.icon])
            )}
            <p className="text-gray-700 whitespace-nowrap text-sm font-medium">
              {action.name}
            </p>
          </div>
        ))}
      </div>
      <Seperator />
      <Seperator style={"my-0.5"} />
      <Seperator />
      <div className="flex items-center gap-4 px-6 mt-4">
        <Icons.logout />
        <p
          className="text-gray-700 whitespace-nowrap text-sm font-medium cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileDropdown;
