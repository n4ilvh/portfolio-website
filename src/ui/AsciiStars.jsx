import { useEffect, useRef } from "react";

/*
  Animated ASCII starfield: sparse twinkling stars, plus star-flowers that
  burst open (rays with a ring of petals), then fade.

  Made for a section whose windows cover most of the middle, so the bursts
  appear mostly in the title band and the side gutters where they can be seen.
  Drop it inside a `position: relative` section, same as AsciiBloom.
*/

const TWINKLE = " .+*"; // off, faint, medium, bright
const RAY_GLYPHS = ["-", "\\", "|", "/"]; // horizontal, down-right, vertical, down-left
const FADE_MASK = "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)";

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

export default function AsciiStars({
  fontFamily = 'VCR, "VCR OSD Mono", monospace',
  starColor = "rgba(207, 188, 165, 0.42)", // tan stars
  burstColor = "rgba(232, 239, 227, 0.6)", // pale green-white bursts
  density = 0.012, // share of character cells that hold a star
  maxBursts = 4,
  fps = 24,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 0;
    let rows = 0;
    let cw = 9; // character width in px
    let ch = 17; // row height in px
    let aspect = 2; // row height / character width, so bursts look round
    let starGrid = [];
    let burstGrid = [];
    let stars = [];
    let bursts = [];
    let nextSpawn = 0;
    let lastW = 0;
    let lastH = 0;
    let raf = 0;
    let lastFrame = 0;
    let visible = true;
    let disposed = false;
    const t0 = performance.now();

    const spawnBurst = (now, age = 0) => {
      const r = Math.random();
      const titleRows = Math.min(rows, 240 / ch); // roughly where the page title sits
      let cx;
      let cy;
      if (r < 0.5) {
        cx = Math.random() * cols;
        cy = Math.random() * titleRows;
      } else if (r < 0.75) {
        cx = Math.random() * cols * 0.03; // left gutter
        cy = Math.random() * rows;
      } else {
        cx = cols - Math.random() * cols * 0.03; // right gutter
        cy = Math.random() * rows;
      }
      const life = 5000 + Math.random() * 3000;
      bursts.push({
        cx,
        cy,
        born: now - age * life,
        life,
        maxR: 8 + Math.random() * 7, // ray length in characters
        rays: Math.random() < 0.5 ? 6 : 8,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.5,
      });
    };

    const put = (x, y, c) => {
      const xi = Math.round(x);
      const yi = Math.round(y);
      if (xi < 0 || xi >= cols || yi < 0 || yi >= rows) return;
      burstGrid[yi * cols + xi] = c;
      starGrid[yi * cols + xi] = " "; // a burst hides any star underneath it
    };

    const draw = (now) => {
      if (!cols || !rows) return;
      const t = (now - t0) / 1000;
      starGrid.fill(" ");
      burstGrid.fill(" ");

      // 1. Twinkling stars
      for (const s of stars) {
        const v = Math.pow(0.5 + 0.5 * Math.sin(t * s.speed + s.phase), 1.5); // spends more time dim
        starGrid[s.y * cols + s.x] = TWINKLE[Math.min(TWINKLE.length - 1, Math.floor(v * TWINKLE.length))];
      }

      // 2. Star-flower bursts: rays, a ring of petals between them, and a bright centre
      for (const b of bursts) {
        const p = clamp01((now - b.born) / b.life);
        const fade = Math.sin(Math.PI * p); // 0 at birth, 1 mid-life, 0 at the end
        if (fade < 0.08) continue;
        const len = b.maxR * easeOutCubic(p);
        const rot = b.rot + b.spin * (now - t0) / 1000;
        const step = (Math.PI * 2) / b.rays;

        for (let k = 0; k < b.rays; k++) {
          const a = rot + k * step;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const glyph = RAY_GLYPHS[((Math.round(a / (Math.PI / 4)) % 4) + 4) % 4];
          for (let i = 1; i <= len; i++) {
            const dim = i > len * 0.7 || fade * (1 - i / len) < 0.12;
            put(b.cx + cos * i, b.cy + (sin * i) / aspect, dim ? "." : glyph);
          }
          const pa = rot + (k + 0.5) * step; // petal sits halfway between two rays
          put(b.cx + Math.cos(pa) * len * 0.5, b.cy + (Math.sin(pa) * len * 0.5) / aspect, fade > 0.5 ? "o" : ".");
        }
        put(b.cx, b.cy, fade > 0.6 ? "@" : fade > 0.3 ? "*" : "+");
      }

      // 3. Paint both layers, one row of text at a time
      ctx.clearRect(0, 0, cols * cw, rows * ch);
      ctx.fillStyle = starColor;
      for (let y = 0; y < rows; y++) ctx.fillText(starGrid.slice(y * cols, (y + 1) * cols).join(""), 0, y * ch);
      ctx.fillStyle = burstColor;
      for (let y = 0; y < rows; y++) ctx.fillText(burstGrid.slice(y * cols, (y + 1) * cols).join(""), 0, y * ch);
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || disposed) return;
      if (now - lastFrame >= 1000 / fps) {
        lastFrame = now;
        bursts = bursts.filter((b) => now - b.born < b.life);
        if (bursts.length < maxBursts && now >= nextSpawn) {
          spawnBurst(now);
          nextSpawn = now + 1800 + Math.random() * 1800;
        }
        draw(now);
      }
      raf = requestAnimationFrame(frame);
    };

    const setup = (force = false) => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      if (!force && Math.round(width) === lastW && Math.round(height) === lastH) return;
      lastW = Math.round(width);
      lastH = Math.round(height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); // resizing resets the canvas state, so set it all again
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontPx = width < 700 ? 12 : 15; // smaller text on phones keeps the character count down
      ctx.font = `${fontPx}px ${fontFamily}`;
      ctx.textBaseline = "top";
      cw = ctx.measureText("M").width || fontPx * 0.6;
      ch = Math.round(fontPx * 1.15);
      aspect = ch / cw;
      cols = Math.ceil(width / cw) + 1;
      rows = Math.ceil(height / ch) + 1;
      starGrid = new Array(cols * rows).fill(" ");
      burstGrid = new Array(cols * rows).fill(" ");

      stars = Array.from({ length: Math.round(cols * rows * density) }, () => ({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
      }));

      const now = performance.now();
      bursts = [];
      for (let i = 0; i < 2; i++) spawnBurst(now, 0.2 + Math.random() * 0.4); // start with a couple mid-burst
      nextSpawn = now + 1200;

      if (reduceMotion) draw(now);
      else if (visible && !raf) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => setup());
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduceMotion && cols) raf = requestAnimationFrame(frame);
    });
    io.observe(wrap);

    // Redo the layout once the VCR font has loaded so the character width is exact
    document.fonts?.load(`15px ${fontFamily}`).then(() => !disposed && setup(true)).catch(() => {});

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [fontFamily, starColor, burstColor, density, maxBursts, fps]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        WebkitMaskImage: FADE_MASK,
        maskImage: FADE_MASK,
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
