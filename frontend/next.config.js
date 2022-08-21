/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com"]
  },
  swcMinify: true
};

module.exports = nextConfig;
