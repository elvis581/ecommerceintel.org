"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { appendUtmParams } from "@/lib/utm";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { eventName?: AnalyticsEventName; eventParams?: Record<string, string | number | boolean> };

export function TrackedLink({ eventName, eventParams, onClick, ...props }: Props) {
  const router = useRouter();
  return <Link {...props} onClick={(event) => {
    if (eventName) trackEvent(eventName, eventParams);
    onClick?.(event);
    if (event.defaultPrevented || typeof props.href !== "string" || !props.href.startsWith("/")) return;
    const enrichedHref = appendUtmParams(props.href, window.location.search, window.location.origin);
    if (enrichedHref !== props.href) {
      event.currentTarget.href = enrichedHref;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      router.push(enrichedHref);
    }
  }} />;
}
