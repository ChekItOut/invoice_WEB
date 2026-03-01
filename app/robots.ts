import type { MetadataRoute } from "next";

/**
 * robots.txt 동적 생성
 * 검색 엔진 크롤러 접근 제어 설정
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/invoice/*"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/sitemap.xml`,
  };
}
