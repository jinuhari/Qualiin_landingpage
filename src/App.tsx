import { type PointerEvent, useState } from "react";

const A = "/assets";

function moveGradient(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;

  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  event.currentTarget.style.setProperty("--pointer-x", `${x * 90}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${y * 70}px`);
  event.currentTarget.style.setProperty("--pointer-x-reverse", `${x * -60}px`);
  event.currentTarget.style.setProperty("--pointer-y-reverse", `${y * -45}px`);
}

function resetGradient(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--pointer-x", "0px");
  event.currentTarget.style.setProperty("--pointer-y", "0px");
  event.currentTarget.style.setProperty("--pointer-x-reverse", "0px");
  event.currentTarget.style.setProperty("--pointer-y-reverse", "0px");
}

function Logo({ large = false }: { large?: boolean }) {
  return (
    <div className={`logo ${large ? "logo--large" : ""}`} aria-label="Qualiin">
      <img src={`${A}/${large ? "0b1c5" : "87a38"}.svg`} alt="" />
      <img src={`${A}/${large ? "7eb59" : "208b5"}.svg`} alt="" />
      <img src={`${A}/${large ? "29a16" : "84c05"}.svg`} alt="" />
      <img src={`${A}/${large ? "6ef39" : "1edd6"}.svg`} alt="" />
      <img src={`${A}/${large ? "8abc5" : "f794c"}.svg`} alt="" />
      <img src={`${A}/${large ? "84deb" : "163bd"}.svg`} alt="" />
      <img src={`${A}/${large ? "f33d5" : "b0cce"}.svg`} alt="" />
    </div>
  );
}

const values = [
  {
    title: "Precision",
    text: "Meticulous attention to regulatory details and documentation",
    icon: "809e5.svg",
  },
  {
    title: "Transparency",
    text: "Clear communication and honest guidance throughout the process.",
    icon: "45363.svg",
  },
  {
    title: "Partnership",
    text: "Your success is our success — we work as an extension of your team.",
    icon: "7bdb1.svg",
  },
  {
    title: "Innovation",
    text: "Your success is our success — we work as an extension of your team.",
    icon: "99a46.svg",
  },
];

const services = [
  {
    title: "Compliance",
    intro:
      "Stay compliant with comprehensive quality management and regulatory support throughout your product lifecycle.",
    items: [
      "QMS Implementation (ISO 13485)",
      "Internal & External Audit",
      "Support Post-Market",
      "Surveillance (PMS) Risk",
    ],
  },
  {
    title: "Evidence",
    intro:
      "Build confidence in your medical devices with robust clinical evidence and performance evaluation support.",
    items: [
      "Clinical Evaluation Reports",
      "(CER) Performance",
      "Evaluation Plans Literature",
      "Reviews & Meta-analysis",
    ],
  },
  {
    title: "Launchpads",
    intro:
      "Fast-track your global market entry with end-to-end regulatory approvals for India, US, and EU.",
    items: [
      "India CDSCO(Registration & Import License)",
      "US FDA 510(k) Accelerator",
      "CE Mark Navigator (MDR/IVDR)",
      "Global Market Access Bundle",
    ],
  },
  {
    title: "Build",
    intro:
      "Build your manufacturing capabilities with end-to-end facility planning, qualification, and validation expertise.",
    items: [
      "Cleanroom Design & Validation Facility Layout",
      "Planning Equipment",
      "Qualification (IQ/OQ/PQ)",
      "Manufacturing Process Validation",
    ],
  },
];

function ServiceArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="service-artwork service-artwork--compliance" aria-hidden="true">
        <img className="compliance-orbit" src={`${A}/bd9b2.svg`} alt="" />
        <img className="compliance-outline" src={`${A}/6e42b.svg`} alt="" />
        <img className="compliance-page compliance-page--back" src={`${A}/802df.svg`} alt="" />
        <img className="compliance-page compliance-page--middle" src={`${A}/b1a23.svg`} alt="" />
        <img className="compliance-page compliance-page--front" src={`${A}/d991d.svg`} alt="" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="service-artwork service-artwork--evidence" aria-hidden="true">
        <img className="card-arc" src={`${A}/29929.svg`} alt="" />
        <img className="evidence-piece evidence-piece--trail" src={`${A}/c5eac.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-one" src={`${A}/ab400.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-two" src={`${A}/a2de3.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-three" src={`${A}/f9535.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-four" src={`${A}/4a75d.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-five" src={`${A}/5dbdc.svg`} alt="" />
        <img className="evidence-piece evidence-piece--page-six" src={`${A}/b5e77.svg`} alt="" />
        <img className="evidence-piece evidence-piece--lens-glow" src={`${A}/ecb8c.svg`} alt="" />
        <img className="evidence-piece evidence-piece--document" src={`${A}/13341.svg`} alt="" />
        <img className="evidence-piece evidence-piece--lens-ring" src={`${A}/bc41a.svg`} alt="" />
        <img className="evidence-piece evidence-piece--lens-mask" src={`${A}/960bb.svg`} alt="" />
        <img className="evidence-piece evidence-piece--lens" src={`${A}/c898d.svg`} alt="" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="service-artwork service-artwork--launchpads" aria-hidden="true">
        <img src={`${A}/fedc7.svg`} alt="" />
      </div>
    );
  }

  return (
    <div className="service-artwork service-artwork--build" aria-hidden="true">
      <img className="card-arc" src={`${A}/29929.svg`} alt="" />
      <img className="build-stack" src={`${A}/c4e85.svg`} alt="" />
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className={`service-card ${flipped ? "is-flipped" : ""}`}
      tabIndex={0}
      aria-label={`${service.title} service. Focus or hover for details.`}
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      }}
    >
      <div className="service-card__inner">
        <div className="service-card__face service-card__front">
          <ServiceArtwork index={index} />
          <div className="service-card__label">
            <span>Qualiin</span>
            <h3>{service.title}</h3>
          </div>
        </div>
        <div className="service-card__face service-card__back">
          <p className="service-card__intro">{service.intro}</p>
          <ul>
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="#contact" onClick={(event) => event.stopPropagation()}>
            Read More
          </a>
        </div>
      </div>
    </article>
  );
}

const footerGroups = [
  { title: "About", links: ["About Us", "Our team", "Careers", "Contact us"] },
  { title: "Resources", links: ["Whitepapers", "Blog", "News & Events", "Industries"] },
  { title: "Services", links: ["ISO Implementation", "CE Marking"] },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="logo-link">
          <Logo />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a href="#values" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <a href="#solutions" onClick={() => setMenuOpen(false)}>
            Resources
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Careers
          </a>
        </nav>
        <a className="button button--small header-cta" href="#contact">
          Contact Us
        </a>
      </header>

      <section
        className="hero"
        id="top"
        onPointerMove={moveGradient}
        onPointerLeave={resetGradient}
      >
        <div className="hero__gradient hero__gradient--one" />
        <div className="hero__gradient hero__gradient--two" />
        <img className="hero__lines" src={`${A}/119d6.svg`} alt="" />
        <div className="hero__content">
          <h1>
            GUIDED BY <em>QUALITY</em>
            <br />
            DRIVEN BY <em>INNOVATION</em>
          </h1>
          <p>
            Helping companies to focus on innovation and quality, by helping them navigate A to Z
            regulations.
          </p>
          <a className="button" href="#contact">
            Contact Us
          </a>
        </div>
      </section>

      <section className="values section" id="values">
        <div className="section-heading">
          <h2>Our values</h2>
          <p>Expert regulatory compliance and quality assurance solutions tailored to your needs</p>
        </div>
        <div className="values__grid">
          {values.map((value) => (
            <article className="value-card" key={value.title}>
              <div className="value-card__icon">
                <img src={`${A}/${value.icon}`} alt="" />
              </div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading section-heading--light">
          <h2>Our Services</h2>
          <p>Expert regulatory compliance and quality assurance solutions tailored to your needs</p>
        </div>
        <div className="services__grid">
          {services.map((service, index) => (
            <ServiceCard service={service} index={index} key={service.title} />
          ))}
        </div>
      </section>

      <section className="solutions section" id="solutions">
        <div className="solutions__image">
          <img src={`${A}/71bfa.png`} alt="Regulatory professional working at a desk" />
        </div>
        <div className="solutions__content">
          <h2>End-to-End Regulatory Solutions</h2>
          <p>
            From regulatory submissions to facility setup, we provide comprehensive solutions that
            enable companies to succeed in global markets.
          </p>
          <div className="solutions__list">
            {[
              "Regulatory Submissions",
              "ISO Implementation",
              "CE Marking",
              "Facility Setup",
              "Cleanroom Design",
              "Quality Assurance",
            ].map((item) => (
              <div key={item}>
                <img src={`${A}/9313b.svg`} alt="" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="cta"
        id="contact"
        onPointerMove={moveGradient}
        onPointerLeave={resetGradient}
      >
        <img className="cta__texture" src={`${A}/8d007.svg`} alt="" />
        <div className="cta__glow cta__glow--one" />
        <div className="cta__glow cta__glow--two" />
        <div className="cta__content">
          <div>
            <h2>
              End-to-End
              <br />
              Regulatory Solutions
            </h2>
            <p>
              Talk to our expert and explore how Qualiin can support your regulatory and quality
              journey.
            </p>
          </div>
          <a className="button" href="mailto:hello@qualiin.com">
            Schedule a call
          </a>
        </div>
      </section>

      <footer>
        <div className="footer__brand">
          <Logo large />
          <p>Our vision is to provide convenience and help increase your sales business.</p>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <img src={`${A}/9811b.svg`} alt="" />
            </a>
            <a href="#" aria-label="X">
              <img src={`${A}/e6637.svg`} alt="" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={`${A}/797ba.svg`} alt="" />
            </a>
          </div>
          <small>©2025 Company Name. All rights reserved</small>
        </div>
        <div className="footer__right">
          <div className="footer__links">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a href="#" key={link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="footer__legal">
            <a href="#">Privacy &amp; Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>

      <a className="chat" href="mailto:hello@qualiin.com" aria-label="Chat with Qualiin">
        <img src={`${A}/ee2f8.svg`} alt="" />
      </a>
    </main>
  );
}
