"use client";
import { useState } from "react";

import React from "react";
import Image from "next/image";
import { Icons } from "@/components/Icons";
import logo from "@/assets/waitlist/logo.png";
import logo_2 from "@/assets/images/solux_logo.png";
import flame from "@/assets/waitlist/flame.png";
import frame from "@/assets/waitlist/Frame.svg";
import { addToWaitlist } from "@/api/waitlistApi";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

const WaitlistPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newEntry = await addToWaitlist(email);
      toast.success(
        "Successfully addeded to waitlist! We'll keep you updated."
      );
      setEmail("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("This email is already registered for the waitlist.");
      } else {
        toast.error(
          error.message || "Failed to join waitlist. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-[#030103]">
      {/* Green banner - hidden on mobile and tablet */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 h-[98%] flex-col items-center justify-between bg-gradient-to-b
        from-green-950 to-black m-5 rounded-lg"
      >
        {/* Logo and Text */}
        <div className="text-center p-6 pt-60 rounded-lg">
          <Image src={logo} alt="SolUX Logo" className="w-60 mx-auto mb-5" />
          <h1 className="text-white text-2xl font-medium px-28 font-sans">
            Save hours of research, understand web3 design patterns, discover
            the interface of real life crypto apps quicker
          </h1>
        </div>

        <Image src={frame} alt="frame" className="w-[70%] object-contain" />
      </div>

      {/* Right section - full width on mobile and tablet */}
      <div className="h-screen lg:h-screen flex flex-col items-center w-full lg:w-1/2 px-4 lg:px-8">
        <div className="flex justify-between items-center w-full px-2 pt-5 lg:pt-16 mb-10">
          <Image
            src={logo}
            alt="SolUX Logo"
            className="w-6 sm:w-7 mb-0 sm:mb-4"
          />
          <div className="flex items-center gap-2 sm:gap-4 justify-center">
            <span className="font-sans font-semibold text-sm sm:text-base dark:text-white">
              <a
                href="https://likkles-organization.gitbook.io/solux"
                target="_blank"
                rel="noopener noreferrer"
              >
                FAQ
              </a>
            </span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Icons.sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Icons.moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center px-4 sm:px-6">
          {/* Logo - adjusted size */}
          <div className="flex justify-center">
            <Image
              src={logo_2}
              alt="SolUX Logo"
              className="w-36 sm:w-44 lg:w-52"
            />
          </div>

          {/* Small label */}
          <div className="inline-flex items-center gap-2 bg-[#002211] dark:bg-gray-900 text-white text-sm sm:text-base px-2 sm:px-3 py-1 rounded-md font-sans">
            <div className="w-3 h-3 sm:w-4 sm:h-4 relative">
              <Image src={flame} alt="flame" fill className="object-contain" />
            </div>
            <span className="px-2 sm:px-3">
              Amazing resources coming your way
            </span>
          </div>

          {/* Heading - adjusted size */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-dm-sans leading-tight dark:text-white">
            UI & UX design reference library for crypto based applications.
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 font-Inter font-semibold text-sm sm:text-base px-2 sm:px-4">
            By joining our wait-list, you&apos;ll gain priority access to new
            features, founding member benefits, and special offers before anyone
            else.
          </p>

          {/* Form section - adjusted padding and size */}
          <div className="space-y-4 w-full max-w-lg mx-auto px-2 sm:px-4">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-md border border-gray-500 text-base sm:text-lg text-gray-500 placeholder:text-gray-500 outline-none bg-transparent dark:text-white dark:placeholder:text-gray-400"
              />
              <button
                className="w-full mt-3 sm:mt-4 bg-[#002211] dark:bg-[#081a10] text-white py-3 sm:py-4 rounded-md font-semibold transition-colors text-base sm:text-lg hover:bg-opacity-90"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Join waitlist →"}
              </button>
            </form>
          </div>

          {/* Launch info */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-400 dark:bg-gray-500"></div>
            </div>
            <span>Launching Q2 2025</span>
            <div className="flex gap-2">
              <a
                href="https://x.com/SolUX_er"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Icons.twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Blockchain Tags - Only visible on mobile and tablet */}
        <div className="flex justify-center items-center relative w-full max-w-md mx-auto lg:hidden mt-4"> 
         <Image src={frame} alt="frame" className="w-[100%] object-contain" />
        </div>
      </div>
    </main>
  );
};

export default WaitlistPage;
