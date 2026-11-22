import { type PointerEvent, useEffect, useState } from "react";
import HeroFly from "./HeroFly";

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
  },
  {
    title: "Transparency",
    text: "Clear communication and honest guidance throughout the process.",
  },
  {
    title: "Partnership",
    text: "Your success is our success — we work as an extension of your team.",
  },
  {
    title: "Innovation",
    text: "We rethink how compliance gets done, so you don\u2019t have to.",
  },
];

function ValueIcon({ title }: { title: string }) {
  if (title === "Precision") {
    return (
      <svg className="ov-ic" viewBox="0 0 90.2227 90.334" fill="none" aria-hidden="true" focusable="false">
        <path className="tile" d="M0 12.1113C0 5.48391 5.37258 0.111328 12 0.111328H78.2227C84.8501 0.111328 90.2227 5.48391 90.2227 12.1113V78.334C90.2227 84.9614 84.8501 90.334 78.2227 90.334H12C5.37259 90.334 0 84.9614 0 78.334V12.1113Z" />
        <path className="fb p-o" stroke="#1D033E" strokeWidth="2.51559" strokeLinecap="round" d="M49.6932 27.2762C48.2493 26.9221 46.7402 26.7344 45.1872 26.7344C34.7738 26.7344 26.332 35.1761 26.332 45.5895C26.332 56.003 34.7738 64.4447 45.1872 64.4447C55.6006 64.4447 64.0424 56.003 64.0424 45.5895C64.0424 44.0081 63.8477 42.4722 63.481 41.0044" />
        <path className="fb p-i" stroke="#FF7838" strokeWidth="2.51559" strokeLinecap="round" d="M48.2403 32.8453C47.2199 32.5917 46.1523 32.457 45.0534 32.457C37.7816 32.457 31.8867 38.3519 31.8867 45.6237C31.8867 52.8954 37.7816 58.7904 45.0534 58.7904C52.3251 58.7904 58.22 52.8954 58.22 45.6237C58.22 44.3777 58.047 43.1721 57.7235 42.0296" />
        <path className="p-dart" fill="#FF7838" d="M61.7727 37.9547C61.3685 38.359 60.8105 38.5709 60.2398 38.537L54.4707 38.194L46.0379 46.6268L44.2563 44.8452L52.6891 36.4124L52.3813 30.6137C52.3513 30.0489 52.5619 29.4979 52.9608 29.0969L57.9883 24.0449L59.0984 30.1367C59.247 30.9523 59.8834 31.5916 60.6983 31.7441L66.8354 32.892L61.7727 37.9547Z" />
        <path className="fb p-dot" fill="#FF7838" d="M45.0518 39.0527C48.6806 39.0528 51.6221 41.9942 51.6221 45.623C51.622 49.2519 48.6806 52.1933 45.0518 52.1934C41.4229 52.1934 38.4805 49.2519 38.4805 45.623C38.4805 41.9941 41.4228 39.0527 45.0518 39.0527Z" />
      </svg>
    );
  }

  if (title === "Transparency") {
    return (
      <svg className="ov-ic" viewBox="317.668 0 90.2227 90.334" fill="none" aria-hidden="true" focusable="false">
        <path className="tile" d="M317.668 12.1113C317.668 5.48391 323.041 0.111328 329.668 0.111328H395.891C402.518 0.111328 407.891 5.48391 407.891 12.1113V78.334C407.891 84.9614 402.518 90.334 395.891 90.334H329.668C323.041 90.334 317.668 84.9614 317.668 78.334V12.1113Z" />
        <path className="sp t-b" stroke="#1D033E" strokeWidth="2.51559" strokeLinecap="round" d="M345.131 52.287L342.75 53.6025L362.331 64.4222C362.849 64.7085 363.478 64.7085 363.996 64.4222L383.577 53.6025L379.505 51.0645" />
        <path className="sp t-m" stroke="#FF7838" strokeWidth="2.51559" strokeLinecap="round" d="M345.131 43.8926L342.75 45.2081L362.331 56.0277C362.849 56.3141 363.478 56.3141 363.996 56.0277L383.577 45.2081L381.197 43.8926" />
        <path className="sp t-t" stroke="#1D033E" strokeWidth="2.51559" d="M363.488 26.8965L343.398 37.7921L363.488 48.6876L383.578 37.7921L363.488 26.8965Z" />
        <path className="sp t-d" fill="#FF7838" d="M353.113 37.4749L363.453 31.8672L373.793 37.4749L363.453 43.0827L353.113 37.4749Z" />
      </svg>
    );
  }

  if (title === "Partnership") {
    return (
      <svg className="ov-ic" viewBox="635.332 0 90.2227 90.2227" fill="none" aria-hidden="true" focusable="false">
        <path className="tile" d="M635.332 12C635.332 5.37259 640.705 0 647.332 0H713.555C720.182 0 725.555 5.37258 725.555 12V78.2227C725.555 84.8501 720.182 90.2227 713.555 90.2227H647.332C640.705 90.2227 635.332 84.8501 635.332 78.2227V12Z" />
        <path className="pa-o" fill="#FF7838" d="M689.083 26.3652C692.734 26.3652 695.693 29.3248 695.693 32.9755C695.693 36.6263 692.734 39.5859 689.083 39.5859C685.432 39.5859 682.473 36.6263 682.473 32.9755C682.473 29.3248 685.432 26.3652 689.083 26.3652Z" />
        <path className="pa-h" fill="#1D033E" fillRule="evenodd" clipRule="evenodd" d="M679.049 38.0986C679.049 35.1481 676.657 32.7559 673.706 32.7559C670.756 32.7559 668.363 35.1481 668.363 38.0986C668.363 41.0492 670.756 43.4413 673.706 43.4413C676.657 43.4413 679.049 41.0492 679.049 38.0986ZM681.584 38.0986C681.584 42.4496 678.057 45.9766 673.706 45.9766C669.355 45.9766 665.828 42.4496 665.828 38.0986C665.828 33.7476 669.355 30.2207 673.706 30.2207C678.057 30.2207 681.584 33.7476 681.584 38.0986Z" />
        <path className="fb pa-b" fill="#FF7838" d="M691.285 42.834C696.987 42.834 701.609 47.456 701.609 53.1577V58.8591H669.885C669.185 58.8591 668.617 58.2916 668.617 57.5915C668.617 56.8914 669.185 56.3239 669.885 56.3239H699.074V53.1577C699.074 48.8564 695.586 45.3692 691.285 45.3692H683.744C683.044 45.3692 682.477 44.8017 682.477 44.1016C682.477 43.4015 683.044 42.834 683.744 42.834H691.285Z" />
        <path fill="#1D033E" d="M694.13 49.8399C694.13 50.54 693.563 51.1075 692.863 51.1075L671.226 51.1075C666.925 51.1075 663.438 54.5947 663.438 58.896V62.0621H700.257C700.957 62.0621 701.525 62.6297 701.525 63.3298C701.525 64.0298 700.957 64.5974 700.257 64.5974H660.902V58.896C660.902 53.1942 665.524 48.5723 671.226 48.5723H692.863C693.563 48.5723 694.13 49.1398 694.13 49.8399Z" />
      </svg>
    );
  }

  return (
    <svg className="ov-ic" viewBox="953 0 90.2227 90.2227" fill="none" aria-hidden="true" focusable="false">
      <path className="tile" d="M953 12C953 5.37259 958.373 0 965 0H1031.22C1037.85 0 1043.22 5.37258 1043.22 12V78.2227C1043.22 84.8501 1037.85 90.2227 1031.22 90.2227H965C958.373 90.2227 953 84.8501 953 78.2227V12Z" />
      <circle className="fb halo" cx="998.5" cy="44" r="14" stroke="#FF7838" strokeWidth="1.5" />
      <path className="fb i-base" fill="#1D033E" d="M1002.8 56.3613C1003.35 56.3613 1003.8 56.809 1003.8 57.3613C1003.8 57.9136 1003.35 58.3613 1002.8 58.3613H994.152C993.6 58.3613 993.152 57.9136 993.152 57.3613C993.152 56.809 993.6 56.3613 994.152 56.3613H1002.8Z" />
      <path className="fb i-out" fill="#1D033E" d="M1012.7 31.4159C1020.56 39.2705 1020.56 52.0058 1012.7 59.8604C1011.53 61.0303 1010.25 62.0272 1008.89 62.8497C1008.3 63.2095 1007.53 63.0196 1007.17 62.4257C1006.81 61.8317 1007 61.058 1007.59 60.698C1008.78 59.9794 1009.9 59.1077 1010.92 58.0815C1017.8 51.2093 1017.8 40.0669 1010.92 33.1947C1004.05 26.3227 992.909 26.3233 986.037 33.1954C979.165 40.0675 979.165 51.2087 986.037 58.0809C987.082 59.1258 988.224 60.0113 989.433 60.7373C990.029 61.0948 990.222 61.8674 989.865 62.463C989.508 63.0585 988.735 63.2518 988.139 62.8946C986.755 62.0635 985.449 61.0511 984.258 59.8597C976.404 52.0051 976.404 39.2711 984.258 31.4166C992.112 23.562 1004.85 23.5615 1012.7 31.4159Z" />
      <path className="fb i-ring" fill="#FF7838" d="M998.477 31.0248C1006.48 31.0248 1012.97 37.5156 1012.97 45.5229C1012.97 49.1458 1011.65 52.4582 1009.45 54.9995C1008.26 54.9995 1007.63 53.341 1008.31 52.3659C1009.66 50.4264 1010.46 48.0679 1010.46 45.5229C1010.46 38.9073 1005.09 33.5444 998.477 33.5444C991.861 33.5444 986.498 38.9073 986.498 45.5229C986.498 48.0679 987.293 50.4264 988.647 52.3659C989.327 53.341 988.693 54.9995 987.504 54.9995C985.307 52.4582 983.979 49.1458 983.979 45.5229C983.979 37.5156 990.469 31.0248 998.477 31.0248Z" />
      <path className="fb i-bulb" fill="#FF7838" d="M998.471 36.0469C1000.45 36.0469 1002.37 36.6609 1003.98 37.8027C1005.59 38.9446 1006.8 40.5583 1007.45 42.4189C1008.1 44.2797 1008.15 46.2952 1007.6 48.1855L1007.48 48.5371C1006.9 50.2828 1005.81 51.8233 1004.36 52.9668C1003.72 53.4714 1003.26 54.1966 1003.22 55.002H993.716L993.704 54.8525C993.625 54.1072 993.186 53.44 992.584 52.9668C991.033 51.7471 989.902 50.0758 989.347 48.1855C988.827 46.4135 988.839 44.531 989.375 42.7695L989.491 42.4189C990.097 40.6746 991.201 39.1474 992.662 38.0225L992.959 37.8027C994.569 36.6609 996.496 36.047 998.471 36.0469Z" />
      <path className="fb i-base" fill="#1D033E" d="M993.859 60.9902V59.6074H1002.79V60.9902C1002.79 62.2545 1002.32 63.4669 1001.49 64.3609C1000.65 65.2549 999.512 65.7571 998.327 65.7571C997.142 65.7571 996.006 65.2549 995.168 64.3609C994.33 63.4669 993.859 62.2545 993.859 60.9902Z" />
    </svg>
  );
}

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

  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".values");
    const grid = section?.querySelector<HTMLElement>(".values__grid");
    const cards = Array.from(section?.querySelectorAll<HTMLElement>(".value-card") ?? []);

    if (!grid || cards.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reducedMotion.matches) {
      grid.classList.add("is-enhanced");
      cards.forEach((card, index) => card.style.setProperty("--ov-delay", `${index * 90}ms`));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 },
      );
      cards.forEach((card) => observer.observe(card));

      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      const cleanupPointer: Array<() => void> = [];
      if (finePointer.matches) {
        cards.forEach((card) => {
          let frame = 0;
          const onMove = (event: globalThis.PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
              const icon = card.querySelector<SVGElement>(".ov-ic");
              icon?.style.setProperty(
                "transform",
                `perspective(600px) rotateX(${y * -12}deg) rotateY(${x * 12}deg)`,
              );
            });
          };
          const onLeave = () => {
            cancelAnimationFrame(frame);
            const icon = card.querySelector<SVGElement>(".ov-ic");
            icon?.style.setProperty("transform", "perspective(600px) rotateX(0deg) rotateY(0deg)");
          };
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          cleanupPointer.push(() => {
            cancelAnimationFrame(frame);
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      cards.forEach((card) => {
        const onEnter = () => {
          cards.forEach((other) => {
            if (other !== card) other.classList.add("is-dimmed");
          });
        };
        const onLeave = () => {
          cards.forEach((other) => other.classList.remove("is-dimmed"));
        };
        const onClick = () => {
          card.classList.remove("is-active");
          void card.offsetWidth;
          card.classList.add("is-active");
          window.setTimeout(() => card.classList.remove("is-active"), 1000);
        };
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        card.addEventListener("click", onClick);
        cleanupPointer.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
          card.removeEventListener("click", onClick);
        });
      });

      return () => {
        observer.disconnect();
        cleanupPointer.forEach((cleanup) => cleanup());
      };
    }
  }, []);

  return (
    <main>
      <header className="site-header">
        <a href="#hero-fly" className="logo-link">
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

      <HeroFly />

      <section className="values section" id="values">
        <div className="section-heading">
          <h2>Our values</h2>
          <p>Expert regulatory compliance and quality assurance solutions tailored to your needs</p>
        </div>
        <div className="values__grid">
          <div className="values__column">
            {values.slice(0, 2).map((value) => (
              <article
                className={`value-card value-card--${value.title.toLowerCase()}`}
                key={value.title}
                tabIndex={0}
              >
                <div className="value-card__icon">
                  <ValueIcon title={value.title} />
                </div>
                <div className="value-card__copy">
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="values__column">
            {values.slice(2).map((value) => (
              <article
                className={`value-card value-card--${value.title.toLowerCase()}`}
                key={value.title}
                tabIndex={0}
              >
                <div className="value-card__icon">
                  <ValueIcon title={value.title} />
                </div>
                <div className="value-card__copy">
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </article>
            ))}
          </div>
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
