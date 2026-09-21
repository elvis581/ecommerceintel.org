"use client";

import Image from "next/image";
import { useState } from "react";

type EvidenceImageProps = {
  src: string;
  alt: string;
};

export function EvidenceImage({ src, alt }: EvidenceImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="evidence-image-fallback" role="img" aria-label={`${alt} unavailable`} />;
  return <Image src={src} alt={alt} width={1400} height={800} sizes="(max-width: 820px) 100vw, 820px" loading="lazy" unoptimized onError={() => setFailed(true)} />;
}
