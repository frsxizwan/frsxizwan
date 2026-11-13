import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.roles.join(" · ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(900px 600px at 85% 30%, #14305f 0%, #070b14 60%)",
          color: "#e9edf5",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#9aa5ba" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>{site.tagline[0]}</span>
          <span style={{ opacity: 0.7 }}>{site.tagline[1]}</span>
          <span style={{ opacity: 0.45 }}>{site.tagline[2]}</span>
        </div>
        <div style={{ fontSize: 26, color: "#9aa5ba" }}>{site.roles.join("  ·  ")}</div>
      </div>
    ),
    size,
  );
}
