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
};

module.exports = nextConfig;
