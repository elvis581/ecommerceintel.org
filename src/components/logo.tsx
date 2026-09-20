import { TrackedLink } from "./tracked-link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <TrackedLink href="/" eventName="internal_link_click" eventParams={{placement:"logo",label:"Ecommerce Intel home"}} className="inline-flex items-center gap-2.5" aria-label="Ecommerce Intel home">
      <span className="logo-mark" aria-hidden="true"><span /></span>
      <span className={`logo-wordmark text-[17px] font-extrabold ${inverse ? "text-white" : "text-slate-950"}`}>Ecommerce<span className="text-emerald-500">Intel</span></span>
    </TrackedLink>
  );
}
