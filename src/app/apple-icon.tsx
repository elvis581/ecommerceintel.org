import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "android-chrome-512x512.png")).toString("base64");
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
      <img src={`data:image/png;base64,${logo}`} style={{ width: 180, height: 180 }} alt="Ecommerce Intel" />
    </div>,
    size,
  );
}
