import { TrackedLink } from "./tracked-link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <TrackedLink href="/" eventName="internal_link_click" eventParams={{placement:"logo",label:"Ecommerce Intel home"}} className="inline-flex items-center gap-2.5" aria-label="Ecommerce Intel home">
      <svg className={`logo-mark ${inverse ? "logo-mark-inverse" : ""}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <rect className="logo-mark-shell" x="1.5" y="1.5" width="37" height="37" rx="10" />
        <path className="logo-mark-rule" d="M10.5 12.5h12M10.5 19.5h9M10.5 26.5h12" />
        <path className="logo-mark-spine" d="M27 11.5v17" />
        <circle className="logo-mark-node" cx="27" cy="11.5" r="2.5" />
        <path className="logo-mark-tail" d="M27 26.5h3.5" />
      </svg>
      <span className={`logo-wordmark text-[17px] font-extrabold ${inverse ? "text-white" : "text-slate-950"}`}>Ecommerce<span className="text-emerald-500">Intel</span></span>
    </TrackedLink>
  );
}
