import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = site.name;

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e8",
          color: "#171512",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "20px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6d675c",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: "#b45309",
            }}
          />
          parmeshwar
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div
            style={{
              fontSize: "94px",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #ddd4c6",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#6d675c",
          }}
        >
          <span>Analyst by profession</span>
          <span>Builder by curiosity</span>
        </div>
      </div>
    ),
    ogSize
  );
}
