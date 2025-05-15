"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
// import logo from "@/assets/images/logo.png";
import Avatar from "@/assets/images/Avatar.png";
import { Icons } from "@/components/Icons";
import logo from "@/assets/images/mobile_logo.png";
import logo_2 from "@/assets/images/solux_logo.png";
import ProfileDropdown from "./Dropdowns/Profile";
import Resources from "./Dropdowns/Resources";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Search from "./Search";
import supabase from "@/utils/supabaseClient";

const Header = ({ appPage }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { publicKey, disconnect } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      // Disconnect wallet
      if (disconnect) {
        await disconnect();
      }
      setIsAuthenticated(false);
      // Redirect to home page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Check Supabase auth session
    const getSession = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session: supabaseSession },
        } = await supabase.auth.getSession();
        setSession(supabaseSession);
        setIsAuthenticated(!!supabaseSession || !!publicKey);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthenticated(!!session || !!publicKey);
    });

    return () => subscription?.unsubscribe();
  }, [publicKey]);

  // Check for Solana wallet connection
  useEffect(() => {
    if (publicKey) {
      setIsAuthenticated(true);
    }
  }, [publicKey]);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [router]);

  const getUserDisplayName = () => {
    if (session?.user?.email) {
      return session.user.email;
    }

    if (publicKey) {
      return `@${publicKey.toBase58().slice(0, 8)}`;
    }

    return "User";
  };

  return (
    <nav className="w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-[4%] py-4 lg:py-6 relative">
      {/* Mobile Header */}
      <div className="w-full flex items-center justify-between lg:hidden">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex justify-center items-center cursor-pointer"
        >
          <Image
            src={logo}
            alt="SolUX Logo"
            className="w-[40px] object-contain"
          />
        </div>

        {/* Search */}
        <div className="flex-1 mx-7">
          <Search otherStyles="bg-[#F6F6F6] w-full" />
        </div>

        <div className="flex gap-3">
          <div
            onClick={() => router.push("/community")}
            className="cursor-pointer"
          >
            <Icons.community size={20} color="#667085" />
          </div>

          <div>
            <Icons.bookmark size={20} color="#667085" />
          </div>
        </div>

        {/* Menu and Avatar */}
        <div className="flex items-center gap-2">
          {/* Avatar or Login */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          ) : isAuthenticated ? (
            <div className="relative">
              <Image
                className="rounded-full w-[32px] h-[32px] cursor-pointer"
                width={32}
                height={32}
                src={Avatar}
                alt="avatar"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <ProfileDropdown onLogout={handleLogout} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-[#121212] justify-center rounded-lg py-1.5 px-3 border border-gray-400 shadow-custom"
            >
              <span className="text-white font-semibold text-sm">Login</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-gray-600"
          >
            {showMobileMenu ? (
              <Icons.close size={24} />
            ) : (
              <Icons.menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <div
        className={`${
          showMobileMenu ? "flex" : "hidden"
        } lg:hidden flex-col w-full absolute top-full left-0 bg-white shadow-lg z-50 py-4 px-4 gap-4`}
      >
        <ul className="flex flex-col gap-4">
          <li className="flex cursor-pointer items-center justify-between text-[#121212] text-lg font-medium">
            <span>Product</span>
            <Icons.chevron_down />
          </li>
          <li className="flex cursor-pointer items-center justify-between text-[#121212] text-lg font-medium">
            <span>Reading</span>
            <Icons.chevron_down />
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center justify-between flex-1">
        <div
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer"
        >
          <Image
            src={logo_2}
            alt="SolUX Logo"
            className="w-[162px] h-[51px] object-contain"
          />
        </div>

        <ul className="flex items-center justify-center gap-10 mt-1">
          <li className="flex cursor-pointer items-center gap-2 text-[#121212] text-[24px] font-[500] leading-[32px] font-inter">
            <span>Product</span>
            <Icons.chevron_down />
          </li>
          <li className="flex cursor-pointer items-center gap-2 text-[#121212] text-[24px] font-[500] leading-[32px] font-inter">
            <span>Reading</span>
            <Icons.chevron_down />
          </li>
        </ul>

        <Search otherStyles="bg-[#F6F6F6] w-[500px] mx-10" />

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-[#121212] justify-center rounded-full py-2.5 px-4 border shadow-custom">
            <span className="text-white font-[500] text-[12px] leading-[14px]">
              Submit App
            </span>
          </button>

          <div
            onClick={() => router.push("/community")}
            className="cursor-pointer"
          >
            <Icons.community size={20} color="#667085" />
          </div>

          <div>
            <Icons.bookmark size={20} color="#667085" />
          </div>

          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : isAuthenticated ? (
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
                  {getUserDisplayName()}
                </span>
              </div>
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <ProfileDropdown onLogout={handleLogout} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-[#121212] justify-center rounded-lg py-2.5 px-4 border border-gray-400 shadow-custom"
            >
              <span className="text-white font-semibold text-sm">Login</span>
            </button>
          )}
        </div>
      </div>
      <WalletMultiButton style={{ display: "none" }} />
    </nav>
  );
};

export default Header;
