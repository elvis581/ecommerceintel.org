import { siteConfig } from "@/config/site";

export function goneResponse(pageName: string) {
  const body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>${pageName} Removed | ${siteConfig.name}</title>
  </head>
  <body>
    <main>
      <h1>This page has been removed</h1>
      <p>${pageName} is no longer part of EcommerceIntel.</p>
      <p><a href="/best-ecommerce-intelligence-tools">Browse the current ecommerce intelligence tools guide</a>.</p>
    </main>
  </body>
</html>`;

  return new Response(body, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
