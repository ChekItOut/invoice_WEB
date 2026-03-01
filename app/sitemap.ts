import type { MetadataRoute } from "next";

/**
 * sitemap.xml 동적 생성
 * 검색 엔진에 사이트 구조 정보 제공
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
