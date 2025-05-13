"use client";

import Image from "next/image";
import GoogleIcon from "../../assets/images/social_icon.png";
import { handleWalletConnect } from "@/components/walletProvider/wallectAction";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Icons } from "@/components/Icons";
import logo from "@/assets/waitlist/logo.png";
import logo_2 from "@/assets/images/solux_logo.png";
import frame from "@/assets/waitlist/Frame.svg";
import toast from "react-hot-toast";
// import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { publicKey } = useWallet();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      setIsChecking(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // If user is already authenticated with Supabase or has a wallet connected
        if (session?.user || publicKey) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsChecking(false);
      }
    };

    // Add a delay to ensure wallet state is properly initialized
    const timer = setTimeout(() => {
      checkAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, [publicKey, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Prevent creating new users through login
        },
      });

      if (error) throw error;

      toast.success("Check your email for the verification code!");
      router.push(
        `/verification?email=${encodeURIComponent(email)}&source=login`
      );
    } catch (error) {
      toast.error(
        error.message || "Failed to send verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  // Display loading state while checking authentication
  if (isChecking) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <main className="min-h-[100vh] lg:h-screen flex flex-col lg:flex-row justify-between items-center bg-white dark:bg-[#030103]">
      {/* Green banner - hidden on mobile and tablet */}
      <div className="hidden lg:flex lg: ml-3 w-full lg:w-1/2 h-[98%] flex-col items-center justify-between bg-[#030103] rounded-lg">
        {/* Logo and Text */}
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

      {/* Right section - full width on mobile and tablet */}
      <div className="min-h-screen lg:h-screen flex flex-col justify-center items-center w-full lg:w-1/2 px-4 lg:px-8">
        {/* <div className="flex justify-end items-center w-full px-2 pt-2 lg:pt-5">
          <div className="flex items-center gap-2 sm:gap-4 justify-center">
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
        </div> */}

        <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center px-4 sm:px-6 my-16">
          {/* Logo - adjusted size */}
          <div className="flex justify-center">
            <Image
              src={logo_2}
              alt="SolUX Logo"
              className="w-36 sm:w-44 lg:w-52"
            />
          </div>

          <div>
            {/* Heading - adjusted size */}
            <h1 className="text-[32px] font-[700] sm:font-[600] sm:text-[32px] md:text-3xl lg:text-[32px] font-inter text-[#030103] dark:text-white mt-10 mb-5 leading-[40px]">
              Welcome back
            </h1>

            {/* Form section - adjusted padding and size */}
            <div className="space-y-4 w-full max-w-lg mx-auto px-2 sm:px-4 mb-5">
              <button
                onClick={handleGoogleSignIn}
                className="flex justify-center w-full mt-3 sm:mt-4 border text-[#030103] dark:bg-[#081a10] dark:text-[#E5E5E5] h-[58px] py-3 sm:py-4 rounded-md font-[700] md:font-[600] text-[14px] md:text-[20px] leading-[20px] md:leading-[16px] space-x-0 transition-colors text-base sm:text-lg hover:bg-opacity-90"
                type="button"
                disabled={loading}
              >
                <Image
                  src={GoogleIcon}
                  alt="orange"
                  className="w-5 object-contain mr-5"
                />
                {loading ? "Loading..." : "Continue with Google"}
              </button>

              <button
                onClick={handleWalletConnect}
                className="w-full mt-3 sm:mt-4 border text-[#030103] dark:bg-[#081a10] dark:text-[#E5E5E5] h-[58px] py-3 sm:py-4 rounded-md font-[700] md:font-[600] text-[14px] md:text-[20px] leading-[20px] md:leading-[16px] space-x-0 transition-colors text-base sm:text-lg hover:bg-opacity-90"
                type="submit"
                disabled={loading}
              >
                {publicKey ? (
                  publicKey.toBase58()
                ) : (
                  <>Connect Your Solana Wallet </>
                )}
              </button>

              <WalletMultiButton style={{ display: "none" }} />

              <div className="flex items-center my-7">
                <div className="flex-grow h-px bg-gray-400"></div>
                <span className="mx-4 text-[#999999] text-sm font-medium">
                  OR
                </span>
                <div className="flex-grow h-px bg-gray-400"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-md bg-[#EAEAEA] text-[#030103] text-base sm:text-lg h-[58px] placeholder:text-[#999999] outline-none dark:text-white dark:placeholder:text-gray-400"
                />
                <button
                  className={`w-full mt-3 sm:mt-4 bg-[#030103] dark:bg-[#030103] h-[58px] text-white py-3 sm:py-4 rounded-md font-sm transition-colors text-sm sm:text-lg hover:bg-opacity-90 ${
                    !email.trim() || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "continue"}
                </button>
              </form>
            </div>

            <span className="text-[12px] font-[500] leading-[14px] space-x-0 text-[#000000] dark:text-gray-400">
              By continuing, you agree to SolUX&apos;s
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Policy Policy</span>.
            </span>
          </div>
        </div>

        <span className="text-[14px] font-[500] leading-[14px] space-x-0 text-[#111111] text-inter dark:text-gray-400 mt-10">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer font-semibold"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Sign up{" "}
          </span>
        </span>
      </div>
    </main>
  );
}
