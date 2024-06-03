// Import dotenv
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.s3.amazonaws.com"],
  },
  env: {
    OUTLOOK_USER: process.env.OUTLOOK_USER,
    OUTLOOK_PASS: process.env.OUTLOOK_PASS,
    ABLY_API_KEY: process.env.ABLY_API_KEY,
  },
};

module.exports = nextConfig;
