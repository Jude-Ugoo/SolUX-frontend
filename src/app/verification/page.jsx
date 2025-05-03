"use client";

import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import logo from "@/assets/waitlist/logo.png";
import logo_2 from "@/assets/images/solux_logo.png";
import frame from "@/assets/waitlist/Frame.svg";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";

export default function Verification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isFromLogin, setIsFromLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get email and source from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");
    const emailParam = params.get("email");

    if (source) {
      setIsFromLogin(source === "login");
    }

    if (emailParam) {
      setUserEmail(decodeURIComponent(emailParam));
    }
  }, []);

  // Check authentication state
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email_confirmed_at) {
        setIsAuthenticated(true);
        router.push("/onboarding");
      }
    };

    checkAuth();
  }, [router]);

  // Prevent direct access to verification page
  useEffect(() => {
    if (!userEmail && !isAuthenticated) {
      router.push("/login");
    }
  }, [userEmail, isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      // If verification is successful
      toast.success("Email verified successfully!");
      setIsAuthenticated(true);
      router.push("/onboarding");
    } catch (error) {
      toast.error(
        error.message || "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100vh] lg:h-screen flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-[#030103]">
      {/* Left section with banner */}
      <div className="hidden lg:flex lg:ml-3 w-full lg:w-1/2 h-[98%] flex-col items-center justify-between bg-[#030103] rounded-lg">
        <div className="text-center p-6 pt-60 rounded-lg">
          <Image
            src={logo}
            alt="SolUX Logo"
            className="w-[109px] h-[98.46px] mx-auto mb-5"
          />
          <h1 className="text-white text-[24px] font-[400] leading-[100%] space-x-0 px-28 font-inter">
            Save hours of research, understand web3 design patterns, discover
            the interface of real life crypto apps quicker
          </h1>
        </div>

        <Image
          src={frame}
          alt="frame"
          className="w-[296px] h-[129.25px] object-contain"
        />
      </div>

      {/* Right section */}
      <div className="min-h-screen lg:h-screen flex flex-col justify-center items-center w-full lg:w-1/2 px-4 lg:px-8">
        <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center px-4 sm:px-6 my-16">
          <div className="flex justify-center">
            <Image
              src={logo_2}
              alt="SolUX Logo"
              className="w-36 sm:w-44 lg:w-52"
            />
          </div>

          <div>
            <h1 className="text-[32px] font-[700] sm:font-[600] sm:text-[32px] md:text-3xl lg:text-[32px] font-inter text-[#030103] dark:text-white mt-10 mb-5 leading-[100%] md:leading-[40px] space-x-0">
              {isFromLogin ? "Welcome back" : "Create your SolUX account"}
            </h1>

            <p className="text-[#444444] text-[12px] md:text-[24px] dark:text-gray-300 font-Inter font-[400] md:font-[500] leading-[16px] md:leading-[32px] px-2 sm:px-4 mb-5 mx-10">
              We sent a verification code to {userEmail}. Not you?
            </p>

            <div className="space-y-4 w-full max-w-lg mx-auto px-2 sm:px-4 mb-5">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter verification code"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-md h-[58px] bg-[#EAEAEA] text-[#030103] text-base sm:text-lg placeholder:text-[#999999] outline-none dark:text-white dark:placeholder:text-gray-400"
                />

                <button
                  className="w-full mt-3 sm:mt-4 bg-[#030103] dark:bg-[#030103] text-white py-3 sm:py-4 rounded-md h-[58px] font-sm transition-colors text-sm sm:text-lg hover:bg-opacity-90"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
