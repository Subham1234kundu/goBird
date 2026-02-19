import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whpgeeubwtzevondkwby.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/login',
        destination: '/Admin/login',
      },
      {
        source: '/admin/forgotpassword',
        destination: '/Admin/forgotpassword',
      },
      {
        source: '/admin/dashboard',
        destination: '/Admin/dashboard',
      },
      {
        source: '/admin/leads',
        destination: '/Admin/leads',
      },
      {
        source: '/admin/google-analytics',
        destination: '/Admin/google-analytics',
      },
      {
        source: '/admin/press-release',
        destination: '/Admin/press-release',
      },
    ]
  },
};

export default nextConfig;
