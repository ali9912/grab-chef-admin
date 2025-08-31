import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'flowbills-profile-images-bucket.s3.eu-central-1.amazonaws.com',
      'grabchef.s3.eu-north-1.amazonaws.com',
      'example.com',
    ],
  },
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
