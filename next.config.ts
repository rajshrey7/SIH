import type { NextConfig } from "next";
import path from "path"; // <--- I've added this line

const nextConfig: NextConfig = {
  /* config options here */

  // This line explicitly tells Next.js where your project root is, fixing the warning.
  outputFileTracingRoot: path.join(__dirname), // <--- I've added this line

  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;