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
  },
  async headers() {
    // The site loads no third-party scripts, fonts, or images, so the host
    // allowlist can stay at 'self' throughout.
    //
    // script-src and style-src keep 'unsafe-inline' deliberately: Next inlines
    // its hydration payload and next/image sets inline style attributes. The
    // strict alternative is a per-request nonce, which requires middleware and
    // would turn every page dynamic — undoing the fully-static build this site
    // depends on for speed. Host restrictions still block off-origin injection.
    // next dev compiles with eval-based HMR and source maps, so a CSP without
    // 'unsafe-eval' stops React hydrating entirely — effects never run and the
    // page looks subtly dead. Production builds contain no eval, so the
    // relaxation is scoped to development only.
    const scriptSrc =
      process.env.NODE_ENV === "development"
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        : "script-src 'self' 'unsafe-inline'";

    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "media-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests"
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()"
          }
        ]
      }
    ];
    // HSTS is deliberately absent. It belongs on Apache, which terminates TLS,
    // and setting it before AutoSSL is confirmed working would lock visitors out
    // of a site the browser then refuses to load over http.
  }
};

export default nextConfig;
