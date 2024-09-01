// Import dotenv
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.s3.amazonaws.com"],
  },
  env: {
    ABLY_API_KEY: process.env.ABLY_API_KEY,
  },
};

module.exports = nextConfig;
