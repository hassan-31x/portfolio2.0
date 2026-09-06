import type { MetadataRoute } from "next"

import { getServerSideURL } from "@/utilities/getURL"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getServerSideURL()
  const routes = ["", "/projects", "/about", "/blogs", "/contact"]

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.7,
  }))
}
