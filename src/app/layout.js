"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import useAutoRefresh from "@/hooks/useAutoRefresh";
import Web3Context from "@/context/Web3Context";
import { DataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const AutoConnectWrapper = ({ children }) => {
  const autoConnect = useAutoRefresh();
  return <>{children}</>;
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Context>
          <AutoConnectWrapper>
            {" "}
            <DataProvider>{children}</DataProvider>
          </AutoConnectWrapper>
        </Web3Context>
      </body>
    </html>
  );
}
