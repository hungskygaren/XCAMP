/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/email",
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
