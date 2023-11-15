/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?tutoring.*)\\..*",
          },
        ],
        destination: `/tutoring/:path*`,
      },
    ];
  },
};
