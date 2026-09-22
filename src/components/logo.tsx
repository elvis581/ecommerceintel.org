import Image from "next/image";
import { TrackedLink } from "./tracked-link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <TrackedLink href="/" eventName="internal_link_click" eventParams={{placement:"logo",label:"Ecommerce Intel home"}} className="inline-flex items-center gap-2.5" aria-label="Ecommerce Intel home">
      <Image src="/ecommerceintel-logo-mark.png" width={34} height={34} alt="" aria-hidden="true" className="logo-mark-image" priority />
      <span className={`logo-wordmark text-[17px] font-extrabold ${inverse ? "logo-wordmark-inverse" : "logo-wordmark-default"}`}>Ecommerce<span className="logo-wordmark-accent">Intel</span></span>
    </TrackedLink>
  );
}
