import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["http://localhost:3000", "http://172.31.186.64:3000"],
};

export default nextConfig;
