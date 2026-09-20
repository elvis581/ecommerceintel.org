import { NextResponse } from "next/server";
import { defaultWinningHunterAffiliateUrl } from "@/config/affiliate";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const destination = process.env.WINNINGHUNTER_AFFILIATE_URL?.trim() || defaultWinningHunterAffiliateUrl;
  const target = new URL(destination);
  const incoming = new URL(request.url);
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = incoming.searchParams.get(key);
    if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
  }
  return NextResponse.redirect(target, { status: 307, headers: { "X-Robots-Tag": "noindex, nofollow" } });
}
