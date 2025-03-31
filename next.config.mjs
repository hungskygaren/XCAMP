/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chats",
        permanent: false,
      },
      {
        source: "/email",
        destination: "/email/inbox",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
