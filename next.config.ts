import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site from a subpath. The env flag keeps local
 * development at the root while production (CI) builds are path-prefixed
 * and statically exported.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/farhad-sharifi-portfolio" : undefined;

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
