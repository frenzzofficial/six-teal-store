import type { NextConfig } from "next";

// The auth backend is a separate deployment. Browsers treat two *.vercel.app hosts as
// cross-site, so cookies it set directly would be third-party and often blocked. Instead the
// browser only talks to THIS origin: /api/* is proxied to the backend server-side, which keeps
// the session and CSRF cookies first-party. Server-only (no NEXT_PUBLIC_): where the Next
// server reaches the backend, without a trailing slash or /api.
const apiProxyTarget = (
  process.env.API_PROXY_TARGET ?? "http://localhost:7164"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
