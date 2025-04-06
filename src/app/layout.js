import AppWalletProvider from "@/components/walletProvider/AppWalletProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SolUX",
  description: "Developed with love",
};

export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />
          <AppWalletProvider>{children}</AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
