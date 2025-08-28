import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
    authInterrupts: true,
  },
  images: {
    domains: ['localhost', 'vinllage.xyz'],
  },
}

export default nextConfig
