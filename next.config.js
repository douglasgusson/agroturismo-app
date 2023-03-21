const withPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.lorem.space", "tailwindui.com"],
  },
};

module.exports = withPWA(nextConfig);
