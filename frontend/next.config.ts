import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // catches "power/monthly-summary"
        destination: "http://localhost:5000/:path*", 
      },
      {
        source: "/api/power/:path*", // explicit rule for power endpoints
        destination: "http://localhost:5000/power/:path*",
      },
    ];
  }
  
};

export default nextConfig;
