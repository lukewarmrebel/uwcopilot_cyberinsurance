import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    localPatterns: [
      {
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

