/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_KEY: process.env.GOOGLE_API_KEY,
  },
};

module.exports = nextConfig;
