// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // Image optimization config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
      },
    ],
  },
  // Redirects config
  // TODO: Worth moving this into middleware as it grows
  async redirects() {
    return [
      {
        source: '/',
        destination: '/gallery',
        permanent: false,
      },
      {
        source: '/gallery',
        destination: '/gallery/1',
        permanent: false,
      },
      {
        source: '/gallery/:path*',
        missing: [
          {
            type: "cookie",
            key: "name",
          },
          {
            type: "cookie",
            key: "title",
          },
        ],
        destination: '/login',
        permanent: false,
      },
      {
        source: '/login',
        has: [
          {
            type: "cookie",
            key: "name",
          },
          {
            type: "cookie",
            key: "title",
          },
        ],
        destination: '/',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;
