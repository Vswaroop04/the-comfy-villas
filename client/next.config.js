/** @type {import('next').NextConfig} */
// next.config.ts
const nextConfig = {
    // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
    // Required for UI css to be transpiled correctly 👇
	transpilePackages: ['jotai-devtools'],
  }
  module.export = nextConfig