/** @type {import('next').NextConfig} */
// next.config.ts
const nextConfig = {
  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ["jotai-devtools"],
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!dev && !isServer) {
      Object.assign(config.node, {
        fs: "empty",
      });
    }
  }
};

module.export = nextConfig;
