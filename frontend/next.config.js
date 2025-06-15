/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: [
    '@mui/material',
    '@mui/icons-material',
    '@mui/system',
    '@emotion/styled',
    '@emotion/react',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/material/utils': '@mui/material/node/utils/index.js',
    };
    return config;
  },
};

module.exports = nextConfig;
