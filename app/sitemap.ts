import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shashafaces.com";

  const routes = [
    "/",
    "/about",
    "/auth",
    "/contact",
    "/faq",
    "/feedback",
    "/portfolio",
    "/services",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
