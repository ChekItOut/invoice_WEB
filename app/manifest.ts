import type { MetadataRoute } from "next";

/**
 * 웹 매니페스트 설정
 * PWA 지원 및 모바일 앱 설치 메타데이터
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "노션 기반 견적서 관리 시스템",
    short_name: "견적서 관리",
    description:
      "노션 데이터베이스를 활용한 견적서 관리 및 클라이언트 공유 시스템",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#667eea",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
