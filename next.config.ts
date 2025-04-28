import type { NextConfig } from "next";

// This configuration works in Docker Compose where backend is the service name
const nextConfig: NextConfig = {
  // Disable features that might interfere with API routing
  distDir: ".next",
  typescript: {
    ignoreBuildErrors: false,
  },
  poweredByHeader: true,
  // Define rewrites to proxy API requests to backend
  async rewrites() {
    console.log("Initializing Next.js API rewrites to backend");
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
