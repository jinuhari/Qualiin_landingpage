import { useEffect, useRef } from "react";

import "./hero-fly.css";

type Point = [number, number];

const innerD =
  "M447.362 720.786L96.3369 304.295C85.9521 292.227 70.463 285.058 54.6934 285.058C22.7697 285.058 -2.99997 315.005 -2.99997 352.103";

function getRequired<T extends Element>(root: ParentNode, selector: string) {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Hero fly-through element ${selector} was not found.`);
  return element;
}

export default function HeroFly() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const track = getRequired<HTMLElement>(root, "#hero-fly-track");
    const content = getRequired<HTMLElement>(root, ".hero-fly__content");

    const $ = (id: string): SVGElement => {
      const element = root.querySelector<SVGElement>(`#hf-${id}`);
      if (!element) throw new Error(`Hero fly-through element hf-${id} was not found.`);
      return element;
    };
    const NS = "http://www.w3.org/2000/svg";
    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tmp = document.createElementNS(NS, "path");
    tmp.setAttribute("d", innerD);
    const len = tmp.getTotalLength();
    const N = 70;
    const inner: Point[] = [];
    for (let i = 0; i <= N; i++) {
      const q = tmp.getPointAtLength((len * i) / N);
      inner.push([q.x, q.y]);
    }
    const outer: Point[] = [
      [-3, -1],
      [604.522, 720.766],
    ];
    const panel: Point[] = [[604.522, 720.766], ...inner, [-3, -1]];

    const COPY = { dy: 88, opacity: 0.75, delay: 0.1 };
    const defs = getRequired<SVGDefsElement>(root, "#hf-lines defs");
    const generated: SVGElement[] = [];

    function cloneGrad(src: string, id: string, dy: number) {
      const g = $(`${src}`).cloneNode(true) as SVGLinearGradientElement;
      g.id = `hf-${id}`;
      g.setAttribute("y1", String(Number(g.getAttribute("y1")) + dy));
      g.setAttribute("y2", String(Number(g.getAttribute("y2")) + dy));
      defs.appendChild(g);
      generated.push(g);
    }
    cloneGrad("gL", "gLc", COPY.dy);
    cloneGrad("gR", "gRc", COPY.dy);

    function mkLine(grad: string) {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", `url(#hf-${grad})`);
      p.setAttribute("stroke-width", "3.4");
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("pathLength", "1");
      p.setAttribute("stroke-dasharray", "1");
      $("copy").appendChild(p);
      generated.push(p);
      return p;
    }
    const cLO = mkLine("gLc");
    const cLI = mkLine("gLc");
    const cRO = mkLine("gRc");
    const cRI = mkLine("gRc");

    const main = ["LO", "LI", "RO", "RI", "LHo", "LHi", "RHo", "RHi"].map($);
    main.forEach((p) => {
      p.setAttribute("pathLength", "1");
      p.setAttribute("stroke-dasharray", "1");
    });

    const orange = $("orange");
    function toD(pts: Point[], s: number, mirror: number, close: number, dy = 0) {
      return (
        "M" +
        pts
          .map((P) => {
            const X = 722 + (P[0] - 722) * s;
            const Y = 360 + (P[1] + dy - 360) * s;
            return `${(mirror ? 1444 - X : X).toFixed(1)} ${Y.toFixed(1)}`;
          })
          .join("L") +
        (close ? "Z" : "")
      );
    }
    function setLine(
      el: SVGElement,
      pts: Point[],
      s: number,
      mirror: number,
      draw: number,
      dy = 0,
    ) {
      el.setAttribute("d", toD(pts, s, mirror, 0, dy));
      el.setAttribute("stroke-dashoffset", String(1 - draw));
    }

    let intro = reduce ? 1 : 0;
    let p = 0;
    let t0 = 0;
    let scrollRaf = 0;
    let introRaf = 0;
    const rv = (start: number, length: number) => ease(clamp((intro - start) / length));

    function render() {
      const e = ease(clamp(p));
      const K = 1 + 1.1 * e;
      const d = ease(intro);
      const panelIn = rv(0.55, 0.4);
      const glowIn = rv(0.45, 0.4);
      const textIn = rv(0.5, 0.3);
      const fade = 1 - 0.5 * ease(clamp((K - 1.2) / 0.9));

      $("LP").setAttribute("d", toD(panel, K, 0, 1));
      $("RP").setAttribute("d", toD(panel, K, 1, 1));
      ["LO", "LHo"].forEach((i) => setLine($(i), outer, K, 0, d));
      ["LI", "LHi"].forEach((i) => setLine($(i), inner, K, 0, d));
      ["RO", "RHo"].forEach((i) => setLine($(i), outer, K, 1, d));
      ["RI", "RHi"].forEach((i) => setLine($(i), inner, K, 1, d));
      $("gLw").setAttribute("opacity", String(fade));
      $("gRw").setAttribute("opacity", String(fade));
      $("LH").setAttribute("opacity", String(0.62 * glowIn));
      $("RH").setAttribute("opacity", String(0.62 * glowIn));
      ["pL", "pR"].forEach((k) => {
        $(`${k}0`).setAttribute("stop-opacity", String(0.17 * panelIn));
        $(`${k}1`).setAttribute("stop-opacity", String(0.17 * panelIn * 0.45));
      });

      const dd = ease(clamp((intro - COPY.delay) / 0.8));
      setLine(cLO, outer, K, 0, dd, COPY.dy);
      setLine(cLI, inner, K, 0, dd, COPY.dy);
      setLine(cRO, outer, K, 1, dd, COPY.dy);
      setLine(cRI, inner, K, 1, dd, COPY.dy);
      $("copy").setAttribute("opacity", String(COPY.opacity * fade * rv(COPY.delay + 0.1, 0.5)));

      const sb = 1 + 0.4 * e;
      orange.style.transform = `translate(${(-7.62 * e).toFixed(3)}%,${(-8.33 * e).toFixed(3)}%) scale(${sb.toFixed(4)})`;

      content.style.setProperty("--hf-text", textIn.toFixed(4));
    }

    function readScroll() {
      const r = track.getBoundingClientRect();
      const range = track.offsetHeight - window.innerHeight;
      p = range > 0 ? clamp(-r.top / range) : 0;
    }
    function onScroll() {
      if (!scrollRaf) {
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          readScroll();
          render();
        });
      }
    }

    if (reduce) {
      p = 0;
      intro = 1;
      render();
      return () => generated.forEach((element) => element.remove());
    }

    function tick(now: number) {
      if (!t0) t0 = now;
      intro = clamp((now - t0) / 2600);
      render();
      if (intro < 1) introRaf = requestAnimationFrame(tick);
    }
    readScroll();
    render();
    introRaf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(introRaf);
      generated.forEach((element) => element.remove());
    };
  }, []);

  return (
    <section className="hero-fly" id="hero-fly" aria-label="Hero" ref={rootRef}>
      <div className="hero-fly__track" id="hero-fly-track">
        <div className="hero-fly__stage">
          <svg
            className="hero-fly__layer hero-fly__orange"
            id="hf-orange"
            viewBox="0 0 1443 720"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter
                id="hf-f2"
                x="-300"
                y="-300"
                width="2100"
                height="1600"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="150" />
              </filter>
            </defs>
            <g filter="url(#hf-f2)">
              <path
                d="M863.903 981.903C704.703 948.703 797.569 796.736 863.903 724.903C1089.5 442.903 1234.57 684.736 1278.91 840.903C1206.91 901.736 1023.1 1015.1 863.903 981.903Z"
                fill="#FF7838"
              />
            </g>
          </svg>

          <svg
            className="hero-fly__layer"
            viewBox="0 0 1443 720"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter
                id="hf-f0"
                x="-26.4"
                y="-634.8"
                width="1132.1"
                height="1002.6"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="154.2" />
              </filter>
              <filter
                id="hf-f1"
                x="-485.5"
                y="217.5"
                width="975"
                height="893"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="150" />
              </filter>
              <filter
                id="hf-f3"
                x="989.5"
                y="-270.5"
                width="975"
                height="893"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur stdDeviation="150" />
              </filter>
            </defs>
            <g filter="url(#hf-f0)">
              <path
                d="M609.967 13.2382C400.968 128.908 309.967 -2.11789 290.592 -82.0898C256.383 -154.832 331.809 -375.68 493.82 -281.467C623.428 -206.097 739.26 -279.414 780.974 -325.494C811.055 -260.779 818.967 -102.432 609.967 13.2382Z"
                fill="#8DE5A2"
              />
            </g>
            <g filter="url(#hf-f1)">
              <path
                d="M-119.954 806.049C-238.664 781.293 -169.417 667.975 -119.954 614.411C48.2659 404.13 156.44 584.459 189.5 700.909C135.811 746.271 -1.24408 830.805 -119.954 806.049Z"
                fill="#A98DCD"
              />
            </g>
            <g filter="url(#hf-f3)">
              <path
                d="M1355.02 318.049C1236.31 293.293 1305.56 179.975 1355.02 126.411C1523.24 -83.8697 1631.41 96.4593 1664.47 212.909C1610.78 258.271 1473.73 342.805 1355.02 318.049Z"
                fill="#A98DCD"
              />
            </g>
          </svg>

          <svg
            className="hero-fly__layer"
            id="hf-lines"
            viewBox="0 0 1443 720"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="hf-gL"
                gradientUnits="userSpaceOnUse"
                x1="33.17"
                y1="159.5"
                x2="488.99"
                y2="515.29"
              >
                <stop stopColor="#8DE5A2" />
                <stop offset=".5" stopColor="#FF7838" />
                <stop offset="1" stopColor="#390878" />
              </linearGradient>
              <linearGradient
                id="hf-gR"
                gradientUnits="userSpaceOnUse"
                x1="1401.25"
                y1="185.04"
                x2="958.99"
                y2="517.62"
              >
                <stop stopColor="#8DE5A2" />
                <stop offset=".5" stopColor="#FF7838" />
                <stop offset="1" stopColor="#390878" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="hf-pL"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="520"
                y2="600"
              >
                <stop id="hf-pL0" stopColor="#C9B3F0" stopOpacity=".17" />
                <stop id="hf-pL1" offset=".55" stopColor="#FF7838" stopOpacity=".077" />
                <stop offset="1" stopColor="#FF7838" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="hf-pR"
                gradientUnits="userSpaceOnUse"
                x1="1443"
                y1="0"
                x2="923"
                y2="600"
              >
                <stop id="hf-pR0" stopColor="#C9B3F0" stopOpacity=".17" />
                <stop id="hf-pR1" offset=".55" stopColor="#FF7838" stopOpacity=".077" />
                <stop offset="1" stopColor="#FF7838" stopOpacity="0" />
              </linearGradient>
              <filter
                id="hf-hz"
                x="-60"
                y="-60"
                width="1563"
                height="840"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <g id="hf-copy" />
            <g id="hf-gLw">
              <path
                id="hf-LP"
                fill="url(#hf-pL)"
                d="M604.522 720.766C510.335 720.766 505.159 720.786 447.362 720.786L96.3369 304.295C85.9521 292.227 70.463 285.058 54.6934 285.058C22.7697 285.058 -2.99997 315.005 -2.99997 352.103L-3 -1L604.522 720.766Z"
              />
              <g id="hf-LH" filter="url(#hf-hz)" opacity=".62">
                <path
                  id="hf-LHo"
                  fill="none"
                  stroke="url(#hf-gL)"
                  strokeWidth="8"
                  d="M-3 -1L604.522 720.766"
                />
                <path id="hf-LHi" fill="none" stroke="url(#hf-gL)" strokeWidth="8" d={innerD} />
              </g>
              <path
                id="hf-LO"
                fill="none"
                stroke="url(#hf-gL)"
                strokeWidth="3.4"
                strokeLinecap="round"
                d="M-3 -1L604.522 720.766"
              />
              <path
                id="hf-LI"
                fill="none"
                stroke="url(#hf-gL)"
                strokeWidth="3.4"
                strokeLinecap="round"
                d={innerD}
              />
            </g>
            <g id="hf-gRw">
              <path
                id="hf-RP"
                fill="url(#hf-pR)"
                d="M839.478 720.766C933.665 720.766 938.841 720.786 996.638 720.786L1347.66 304.295C1358.05 292.227 1373.54 285.058 1389.31 285.058C1421.23 285.058 1447 315.005 1447 352.103L1447 -1L839.478 720.766Z"
              />
              <g id="hf-RH" filter="url(#hf-hz)" opacity=".62">
                <path
                  id="hf-RHo"
                  fill="none"
                  stroke="url(#hf-gR)"
                  strokeWidth="8"
                  d="M1447 -1L839.478 720.766"
                />
                <path
                  id="hf-RHi"
                  fill="none"
                  stroke="url(#hf-gR)"
                  strokeWidth="8"
                  d="M996.638 720.786L1347.66 304.295C1358.05 292.227 1373.54 285.058 1389.31 285.058C1421.23 285.058 1447 315.004 1447 352.103"
                />
              </g>
              <path
                id="hf-RO"
                fill="none"
                stroke="url(#hf-gR)"
                strokeWidth="3.4"
                strokeLinecap="round"
                d="M1447 -1L839.478 720.766"
              />
              <path
                id="hf-RI"
                fill="none"
                stroke="url(#hf-gR)"
                strokeWidth="3.4"
                strokeLinecap="round"
                d="M996.638 720.786L1347.66 304.295C1358.05 292.227 1373.54 285.058 1389.31 285.058C1421.23 285.058 1447 315.004 1447 352.103"
              />
            </g>
          </svg>

          <div className="hero-fly__content">
            <h1 className="hero-fly__title">
              <span>
                Guided by <em>Quality</em>
              </span>
              <span>
                Driven by <em>Innovation</em>
              </span>
            </h1>
            {/* TODO: Replace this placeholder with final approved copy; preserve the design text until then. */}
            <p className="hero-fly__sub">
              Helping companies to focus onnavigate on A to Z regulation on A to Z regulation
              innovation and quality, By helping them navigate on A to Z regulations
            </p>
            <a className="hero-fly__btn" href="#contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
