import { ImageResponse } from "next/og";

/**
 * 동적 파비콘 생성
 * SVG 기반 아이콘으로 라이트/다크 모드 대응
 */
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          borderRadius: "20%",
        }}
      >
        NK
      </div>
    ),
    {
      ...size,
    }
  );
}
