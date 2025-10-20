/**
 * Next.js Configuration for Filla Quiz Game
 * Updated:  Web3Bridge Assessment
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Image optimization configuration
  images: {
    domains: [], // Add external image domains here if needed
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'Filla Quiz Game',
  },
}

module.exports = nextConfig
