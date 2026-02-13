import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.goit.study',
        pathname: '/**',
      },
    ],
    // Format for optimization
    formats: ['image/avif', 'image/webp'],
    // Device sizes для responsive images
    deviceSizes: [320, 375, 414, 768, 1024, 1280, 1440, 1920],
    // Image sizes для srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
