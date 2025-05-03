"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import Avatar from "@/assets/images/Avatar.png";
import { Icons } from "@/components/Icons";
import logo_2 from "@/assets/images/solux_logo.png";
import ProfileDropdown from "./Dropdowns/Profile";
import Resources from "./Dropdowns/Resources";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Search from "./Search";

const Header = ({ appPage }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const router = useRouter();
  const { publicKey } = useWallet();

  return (
    <nav className="w-full flex items-center justify-between px-[4%] py-6">
      <div className="flex items-center justify-center gap-10">
        <div
          onClick={() => router.push("/")}
          className="flex cursor-pointer items-center"
        >
          <Image
            src={logo_2}
            alt="SolUX Logo"
            className="w-[184px] object-contain"
          />
        </div>
        <ul className="flex items-center justify-center gap-10 mt-1">
          <li className="flex cursor-pointer items-center gap-2 text-[#121212] text-[22px] font-[500] leading-[32px] font-inter">
            <span>Product</span>
            <Icons.chevron_down />
          </li>
          <li className="flex cursor-pointer items-center gap-2 text-[#121212] text-[22px] font-[500] leading-[32px] font-inter">
            <span>Reading</span>
            <Icons.chevron_down />
          </li>{" "}
          {/* <li className="relative cursor-pointer">
				<div
				onClick={() => setShowResources(!showResources)}
				className="flex items-center gap-2"
				>
				<span className=" text-gray-600 text-base font-semibold">
					Resources
				</span>
				{showResources ? <Icons.chevron_up /> : <Icons.chevron_down />}
				</div>
				{showResources && <Resources />}
			</li> */}
        </ul>
      </div>

      <Search otherStyles={"bg-[#F6F6F6] w-[500px] mx-10"} />

      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push("/price")}
          className="flex items-center gap-2 bg-[#121212] justify-center rounded-full py-2.5 px-4 border shadow-custom"
        >
          <span className="text-white font-[500] text-[12px] leading-[14px]">
            Submit App
          </span>
        </button>
        {/* {!appPage && (
          <>
            <div>
              <Icons.bookmark />
            </div>
            <div className="relative cursor-pointer tooltip">
              <Icons.bitcoin />
              <span className="text-xs tooltip-text top-[200%] py-2 px-3 translate-x-[-50%] left-[50%] font-semibold text-white bg-black-100 whitespace-nowrap absolute rounded-[8px]">
                Tip us using getcode
              </span>
            </div>
          </>
        )} */}

        <div>
          <Icons.bookmark size={20} color="#667085" />
        </div>
        {/* <div className="relative cursor-pointer tooltip">
          <Icons.notification />
        </div> */}

        {publicKey ? (
          <div className="cursor-pointer relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >
              <Image
                className="rounded-full"
                width={40}
                height={40}
                src={Avatar}
                alt="avatar"
              />
              <span className="text-[10px] font-semibold text-black">
                @chisom.Bonk
              </span>
            </div>
            {showProfile && <ProfileDropdown />}
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 bg-primary-100 justify-center rounded-lg py-2.5 px-4 border border-gray-400 shadow-custom"
          >
            {/* <Icons.zap /> */}
            <span className="text-white font-semibold text-sm">Login</span>
          </button>
        )}
        <WalletMultiButton style={{ display: "none" }} />
      </div>
    </nav>
  );
};

export default Header;
