/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "localhost"],
    disableStaticImages: true,
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

export default nextConfig;
