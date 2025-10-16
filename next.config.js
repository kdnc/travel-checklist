/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  // Optimize for Vercel deployment
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
