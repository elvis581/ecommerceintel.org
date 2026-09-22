import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EcommerceIntel",
    short_name: "Ecom Intel",
    description: "Cross-platform ecommerce tools, workflows and operator intelligence.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#123342",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
