import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    // domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // example.com
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_MODE === "production",
  },
};

export default nextConfig;
