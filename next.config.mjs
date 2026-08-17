import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  // Self-contained Node bundle for cPanel Node.js hosting. Unlike a static
  // export this keeps ISR, the route handlers, the redirect below, and on-demand
  // image optimization working.
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  // Next's dependency tracing pulls these into the standalone bundle even though
  // nothing needs them at runtime — together they were ~11MB of the upload.
  outputFileTracingExcludes: {
    "**/*": [
      "node_modules/typescript/**",
      "node_modules/caniuse-lite/**",
      "node_modules/@types/**"
    ]
  },
  images: {
    // AVIF first, WebP fallback. Both are a large win over the source JPEG/PNG
    // on the constrained connections most of our visitors are on.
    formats: ["image/avif", "image/webp"],
    // Trimmed from the Next defaults: the site is mobile-first and the extra
    // breakpoints only ever produced variants nobody requested.
    deviceSizes: [360, 420, 640, 828, 1080, 1280, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
