import { useEffect, useRef } from "react";

/*
  Animated ASCII background: slow flowing streaks, with flowers that bloom
  outward and fade. Drop it inside a `position: relative` section.

  Everything is drawn one row of text at a time on a canvas, so it stays cheap.
  It pauses when scrolled off screen and draws a single still frame if the
  visitor has "reduce motion" turned on.
*/

const FLOW_RAMP = " ..:-~=+"; // faint streaks that drift across the section
const BLOOM_RAMP = " .:+*oO@"; // denser characters for the flowers
const FADE_MASK = "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)";

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

export default function AsciiBloom({
  fontFamily = 'VCR, "VCR OSD Mono", monospace',
  flowColor = "rgba(47, 79, 58, 0.32)", // dark green streaks
  bloomColor = "rgba(207, 188, 165, 0.55)", // tan flowers
  maxBlooms = 5,
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
    let aspect = 2; // row height / character width, so blooms look round
    let bloomField = new Float32Array(0);
    let blooms = [];
    let nextSpawn = 0;
    let lastW = 0;
    let lastH = 0;
    let raf = 0;
    let lastFrame = 0;
    let visible = true;
    let disposed = false;
    const t0 = performance.now();

    const spawn = (now, age = 0) => {
      const life = 7000 + Math.random() * 4000;
      blooms.push({
        cx: Math.random() * cols,
        cy: Math.random() * rows,
        born: now - age * life,
        life,
        maxR: 10 + Math.random() * 12, // radius in characters
        petals: 4 + Math.floor(Math.random() * 4), // 4 to 7 petals
        spin: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI * 2,
      });
    };

    const draw = (now) => {
      if (!cols || !rows) return;
      const t = (now - t0) / 1000;

      // 1. Work out where each flower is, one value per character cell
      bloomField.fill(0);
      for (const b of blooms) {
        const p = clamp01((now - b.born) / b.life);
        const fade = Math.sin(Math.PI * p); // 0 at birth, 1 mid-life, 0 at the end
        const r = b.maxR * easeOutCubic(p);
        const rot = b.rot + b.spin * t;
        const reach = Math.ceil(r * 1.15) + 3;
        const x0 = Math.max(0, Math.floor(b.cx - reach));
        const x1 = Math.min(cols - 1, Math.ceil(b.cx + reach));
        const y0 = Math.max(0, Math.floor(b.cy - reach / aspect));
        const y1 = Math.min(rows - 1, Math.ceil(b.cy + reach / aspect));

        for (let y = y0; y <= y1; y++) {
          const dy = (y - b.cy) * aspect;
          for (let x = x0; x <= x1; x++) {
            const dx = x - b.cx;
            const d = Math.sqrt(dx * dx + dy * dy);
            const petal = 0.5 + 0.5 * Math.cos(b.petals * (Math.atan2(dy, dx) + rot));
            const edge = r * (0.55 + 0.45 * petal); // petal-shaped outline
            const diff = d - edge;
            let v = Math.exp(-(diff * diff) / 3); // the outline, about 1.5 characters thick
            if (d < edge) v = Math.max(v, 0.3 * (1 - d / edge)); // soft fill toward the centre
            v *= fade;
            const i = y * cols + x;
            if (v > bloomField[i]) bloomField[i] = v;
          }
        }
      }

      // 2. Turn the flow + bloom values into two layers of text, row by row
      const flowRows = new Array(rows);
      const bloomRows = new Array(rows);
      for (let y = 0; y < rows; y++) {
        let f = "";
        let b = "";
        const ny = y * 0.085;
        for (let x = 0; x < cols; x++) {
          const bi = Math.floor(bloomField[y * cols + x] * BLOOM_RAMP.length);
          if (bi > 0) {
            b += BLOOM_RAMP[Math.min(BLOOM_RAMP.length - 1, bi)];
            f += " "; // keep the streaks out from under a flower
            continue;
          }
          b += " ";
          const nx = x * 0.045;
          const a = Math.sin(nx * 1.7 + t * 0.35 + Math.sin(ny * 1.3 - t * 0.22) * 2.2);
          const c = Math.sin(ny * 1.4 - t * 0.28 + Math.cos(nx * 1.1 + t * 0.18) * 2.0);
          const e = Math.sin((nx + ny) * 1.1 + t * 0.2);
          const v = Math.pow((a + c + e) / 6 + 0.5, 2.6); // 0 to 1, mostly low so it reads as streaks
          f += FLOW_RAMP[Math.min(FLOW_RAMP.length - 1, Math.floor(v * FLOW_RAMP.length))];
        }
        flowRows[y] = f;
        bloomRows[y] = b;
      }

      // 3. Paint
      ctx.clearRect(0, 0, cols * cw, rows * ch);
      ctx.fillStyle = flowColor;
      for (let y = 0; y < rows; y++) ctx.fillText(flowRows[y], 0, y * ch);
      ctx.fillStyle = bloomColor;
      for (let y = 0; y < rows; y++) ctx.fillText(bloomRows[y], 0, y * ch);
    };

    const frame = (now) => {
      raf = 0;
      if (!visible || disposed) return;
      if (now - lastFrame >= 100 / fps) {
        lastFrame = now;
        blooms = blooms.filter((b) => now - b.born < b.life);
        if (blooms.length < maxBlooms && now >= nextSpawn) {
          spawn(now);
          nextSpawn = now + 1400 + Math.random() * 2400;
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
      bloomField = new Float32Array(cols * rows);

      const now = performance.now();
      blooms = [];
      for (let i = 0; i < 3; i++) spawn(now, 0.15 + Math.random() * 0.5); // start with a few mid-bloom
      nextSpawn = now + 1000;

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
  }, [fontFamily, flowColor, bloomColor, maxBlooms, fps]);

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
