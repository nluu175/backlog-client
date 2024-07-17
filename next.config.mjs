/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.cloudflare.steamstatic.com",
      "flowbite.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;
