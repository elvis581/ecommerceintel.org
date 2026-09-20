"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/config/navigation";
import { Logo } from "./logo";
import { TrackedLink } from "./tracked-link";
import { MobileNavigation } from "./mobile-navigation";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  return (
    <header className="site-header sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="header-container flex h-16 items-center justify-between gap-5">
        <Logo />
        <nav className="site-nav hidden items-stretch self-stretch lg:flex" aria-label="Main navigation">
          {navigation.map((group) => group.items.length ? <div key={group.label} className="nav-group relative flex items-center" onMouseEnter={() => setDesktopMenu(group.label)} onMouseLeave={() => setDesktopMenu(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null); }}><button className="flex h-full items-center gap-1 px-2 text-sm font-semibold text-slate-700 hover:text-slate-950" aria-haspopup="true" aria-expanded={desktopMenu === group.label} aria-controls={`desktop-menu-${group.label.toLowerCase().replaceAll(" ", "-")}`} onFocus={() => setDesktopMenu(group.label)} onClick={() => setDesktopMenu(group.label)} onKeyDown={(event) => { if (event.key === "Escape") { setDesktopMenu(null); event.currentTarget.blur(); } }}>{group.label}<ChevronDown className="size-3.5" aria-hidden="true" /></button><div id={`desktop-menu-${group.label.toLowerCase().replaceAll(" ", "-")}`} className={`nav-panel absolute top-[calc(100%-1px)] w-72 border border-slate-200 bg-white p-2 shadow-xl transition ${group.label === "Workflows" ? "right-0" : "left-0"} ${desktopMenu === group.label ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"}`}>{group.href && <TrackedLink href={group.href} aria-current={pathname === group.href ? "page" : undefined} eventName="internal_link_click" eventParams={{placement:"desktop_nav",label:`${group.label} overview`}} className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700">{group.label} Overview</TrackedLink>}{group.items.map((item) => <TrackedLink key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} eventName="internal_link_click" eventParams={{placement:"desktop_nav",label:item.label}} className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-700">{item.label}</TrackedLink>)}</div></div> : <TrackedLink key={group.label} href={group.href!} aria-current={pathname === group.href ? "page" : undefined} eventName="internal_link_click" eventParams={{placement:"desktop_nav",label:group.label}} className="flex items-center px-2 text-sm font-semibold text-slate-700 hover:text-slate-950">{group.label}</TrackedLink>)}
        </nav>
        <button className="icon-button lg:hidden" onClick={() => setOpen((value) => !value)} onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen((value) => !value);
          }
          if (event.key === "Escape") {
            setOpen(false);
            event.currentTarget.blur();
          }
        }} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && <MobileNavigation onNavigate={() => setOpen(false)} />}
    </header>
  );
}
