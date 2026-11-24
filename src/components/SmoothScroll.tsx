"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    document.querySelector(".hero")?.setAttribute("id", "home");
    document.querySelector(".enquiry")?.setAttribute("id", "enquiry");
    document.querySelector("footer")?.setAttribute("id", "contact");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 850px)");
    if (reduced.matches || mobile.matches) return;
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: .86, touchMultiplier: 1 });
    lenis.on("scroll", ({ scroll }) => document.documentElement.style.setProperty("--hero-parallax", `${Math.min(scroll * .035, 42)}px`));
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    const onHash = () => { const target = document.getElementById(location.hash.slice(1)); if (target) requestAnimationFrame(() => lenis.scrollTo(target, { offset: -104, duration: .9 })); };
    addEventListener("hashchange", onHash);
    if (location.hash) onHash();
    return () => { cancelAnimationFrame(frame); removeEventListener("hashchange", onHash); lenis.destroy(); };
  }, []);
  return null;
}
