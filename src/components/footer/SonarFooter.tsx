import Image from "next/image";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  Flower2,
  ImageIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { images, site } from "../../data/site";
import { Facebook, Instagram, WhatsApp } from "./FooterIcons";
import styles from "./Footer.module.css";

const exploreLinks = [
  { href: "#venue", label: "The Venue", Icon: Building2 },
  { href: "#experiences", label: "Experiences", Icon: Flower2 },
  { href: "#suites", label: "Heritage Suites", Icon: BedDouble },
  { href: "#gallery", label: "Gallery", Icon: ImageIcon },
];

export function SonarFooter() {
  return (
    <footer className={styles.footer} id="contact" data-sonar-footer>
      <div className={styles.shell}>
        <div className={styles.topRow} data-footer-row="top">
          <section className={styles.cta} aria-labelledby="footer-heading">
            <p className={styles.eyebrow}>Let’s celebrate together</p>
            <h2 id="footer-heading">
              Your forever
              <br />
              <em>starts here.</em>
            </h2>
            <p className={styles.intro}>
              A beautiful beginning deserves an extraordinary destination.
            </p>
            <a className={styles.ctaLink} href="#enquiry">
              Plan your celebration <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </section>

          <div className={styles.photo}>
            <Image
              src={images.footer}
              alt="Illustrative candlelit wedding celebration"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className={styles.footerImage}
            />
          </div>
        </div>

        <div className={styles.infoRow} data-footer-row="info">
          <section className={styles.card} aria-labelledby="footer-explore">
            <h3 id="footer-explore">Explore</h3>
            <nav aria-label="Footer navigation" className={styles.linkList}>
              {exploreLinks.map(({ href, label, Icon }) => (
                <a href={href} key={href}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </section>

          <section className={styles.card} aria-labelledby="footer-contact">
            <h3 id="footer-contact">Get in touch</h3>
            <div className={styles.linkList}>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Phone size={22} aria-hidden="true" />
                <span>Call us</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail size={22} aria-hidden="true" />
                <span>Email us</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#enquiry">
                <MapPin size={22} aria-hidden="true" />
                <span>Get directions</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.social} aria-label="Social links">
              <a href="#contact" aria-label="Instagram"><Instagram /></a>
              <a href="#contact" aria-label="Facebook"><Facebook /></a>
              <a href="#contact" aria-label="WhatsApp"><WhatsApp /></a>
            </div>
          </section>

          <a className={styles.visit} href="#enquiry">
            <ArrowUpRight size={29} aria-hidden="true" />
            <h3>Come experience Sonar Angaan.</h3>
            <span>Schedule a visit <ArrowUpRight size={19} aria-hidden="true" /></span>
          </a>
        </div>

        <div className={styles.wordmark} data-footer-row="wordmark" aria-label="Sonar Angaan">
          Sonar Angaan
        </div>

        <div className={styles.utilityRow} data-footer-row="utility">
          <span>© 2026 Sonar Angaan</span>
          <span className={styles.legal}><a href="#contact">Privacy</a><i>·</i><a href="#contact">Terms</a></span>
          <a href="#home">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
