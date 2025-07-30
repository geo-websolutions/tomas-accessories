/** @type {import('next').NextConfig} */

// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();
// const nextConfig = {};

// export default withNextIntl(nextConfig);
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lbbcbulzuhxcasdnmjuf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Optional: Configure image quality and formats
    minimumCacheTTL: 60, // 60 seconds minimum cache
    formats: ['image/webp'], // Prefer WebP format
  },
  // ... other Next.js config options
};

export default nextConfig;