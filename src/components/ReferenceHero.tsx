"use client";

import { ChevronDown, UserRound } from "lucide-react";
import { site } from "../data/site";

const links = [
  ["THE VENUE", "#venue"],
  ["EXPERIENCES", "#experiences"],
  ["HERITAGE SUITES", "#suites"],
  ["CULINARY ART", "#culinary"],
  ["GALLERY", "#gallery"],
  ["STORY", "#story"],
] as const;

export function ReferenceHero() {
  return <div className="reference-layer">
    <header className="reference-nav">
      <a className="reference-brand" href="#top" aria-label={`${site.name} home`}>
        <span className="reference-mark">SONAR ANGAAN</span>
        <span>Sonar<br/>Angaan</span>
      </a>
      <nav aria-label="Main navigation">
        {links.map(([label, href], index) => <a className={index === 0 ? "selected" : ""} href={href} key={label}>{label}</a>)}
      </nav>
      <a className="reference-enquire" href="#enquire">Enquire<br/>now</a>
      <span className="reference-profile" aria-label="Profile"><UserRound size={13}/></span>
    </header>
    <div className="reference-copy">
      <p>THE IMPERIAL SANCTUARY OF UDAIPUR</p>
      <h1>Where <em>Forever</em> Begins.</h1>
      <div className="reference-description">A sanctuary of regal Indian heritage, majestic sunken courtyards, and unhurried<br className="desktop-break"/> Rajasthani royal hospitality curated for once-in-a-lifetime vows.</div>
      <div className="reference-actions">
        <a href="#venue">Explore the venue</a>
        <a href="#enquire">Plan your celebration</a>
      </div>
    </div>
    <a className="reference-scroll" href="#story">Chronicle <ChevronDown size={16}/></a>
  </div>;
}
