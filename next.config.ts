import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site from a subpath. The env flag keeps local
 * development at the root while production (CI) builds are path-prefixed.
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
  // cacheComponents forbids the `dynamic = "force-static"` segment config
  // that static export requires on the metadata routes (robots.txt / sitemap.xml).
  // partialPrefetching depends on cacheComponents, so both are Pages-gated.
  ...(isPages ? {} : { cacheComponents: true, partialPrefetching: true }),
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
