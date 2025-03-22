/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static site generation
  distDir: 'out',    // Output directory
  images: {
    unoptimized: true, // For static export, images need to be unoptimized
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
};

module.exports = nextConfig; 