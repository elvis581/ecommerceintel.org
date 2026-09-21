import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage(title: string, subtitle: string, label = "Independent operator intelligence") {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", background: "#102f3c", color: "#f4f8f9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 800 }}>
        <div style={{ position: "relative", display: "flex", width: 58, height: 58, alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#f4f8f9" }}>
          <div style={{ position: "absolute", left: 12, top: 17, width: 26, height: 4, borderRadius: 4, background: "#123342", boxShadow: "0 10px 0 #123342, 0 20px 0 #123342" }} />
          <div style={{ position: "absolute", right: 14, top: 14, width: 4, height: 25, borderRadius: 4, background: "#d84f2b" }} />
          <div style={{ position: "absolute", right: 10, top: 11, width: 10, height: 10, borderRadius: 999, background: "#d84f2b" }} />
          <div style={{ position: "absolute", right: 7, top: 38, width: 11, height: 4, borderRadius: 4, background: "#d84f2b" }} />
        </div>
        <span>ecommerceintel.org</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ maxWidth: 1000, fontSize: 63, fontWeight: 900, lineHeight: 1.04 }}>{title}</div>
        <div style={{ maxWidth: 920, fontSize: 26, lineHeight: 1.35, color: "#c7d8dd" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#ffd0c2" }}><span>{label}</span><span>ecommerceintel.org</span></div>
    </div>,
    ogSize,
  );
}
