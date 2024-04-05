/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // dùng để nhận được đường dẫn ảnh cloudinary vào thẻ img
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default (nextConfig);
