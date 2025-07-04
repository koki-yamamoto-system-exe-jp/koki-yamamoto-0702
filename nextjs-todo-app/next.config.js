/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/koki-yamamoto-0702/nextjs-todo-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/koki-yamamoto-0702/nextjs-todo-app/' : '',
}

module.exports = nextConfig