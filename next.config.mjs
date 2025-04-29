/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "8000",
        pathname: "/photos/**",
      },
    ],
  },
  output: "standalone",
  // Add other Next.js configurations here if needed
  // For example:
  // reactStrictMode: true,
  // images: {
  //   domains: ['example.com'],
  // },
};

export default nextConfig;
