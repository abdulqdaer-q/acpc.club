import type { MetadataRoute } from "next";

// Crawlers that feed answer engines rather than a classic search index. They are
// listed explicitly because several of them ignore the wildcard rule, and being
// absent from their corpus means the club simply never gets cited.
const answerEngineAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "Bingbot",
  "CCBot"
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleppo.icpc.club";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      {
        userAgent: answerEngineAgents,
        allow: "/"
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
