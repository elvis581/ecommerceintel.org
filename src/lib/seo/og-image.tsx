import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage(title: string, subtitle: string, label = "Independent operator intelligence") {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px", background: "#102f3c", color: "#f4f8f9" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 800 }}>
        <div style={{ position: "relative", display: "flex", width: 58, height: 50, alignItems: "center", justifyContent: "center", border: "3px solid #f4f8f9", borderRadius: 8 }}>
          <div style={{ position: "absolute", left: 10, top: 14, width: 30, height: 3, background: "#102f3c", boxShadow: "0 9px 0 #102f3c, 0 18px 0 #102f3c" }} />
          <div style={{ position: "absolute", right: -7, top: 12, width: 10, height: 10, borderRadius: 999, background: "#ffd0c2", boxShadow: "0 18px 0 #ffd0c2" }} />
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
