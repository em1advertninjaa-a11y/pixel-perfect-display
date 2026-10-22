import { useEffect } from "react";
import beanUrl from "@/assets/coffee-bean.png";

const TRAIL_LIMIT = 36;
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, label, summary, [data-cursor='hover']";
const CTA_SELECTOR =
  "[data-cursor='cta'], [class*='bg-primary'], [class*='bg-forest']";

/**
 * Coffee Bean Sprinkle Cursor.
 * Desktop (fine pointer) only; disabled entirely for reduced-motion users,
 * who keep the standard cursor. Renders nothing — all elements are created
 * inside a single effect and fully cleaned up on unmount.
 */
export function CoffeeCursor() {
  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    const style = getComputedStyle(root);
    const palette = ["--caramel", "--gold", "--olive", "--foreground"]
      .map((name) => style.getPropertyValue(name).trim())
      .filter(Boolean);

    let bean: HTMLDivElement | null = null;
    let trail: HTMLDivElement | null = null;
    let raf = 0;
    let running = false;
    let shown = false;

    const target = { x: -120, y: -120 };
    const pos = { x: -120, y: -120 };
    const motion = { scale: 1, tilt: 0, prevX: -120, prevY: -120 };
    let spawnX = -120;
    let spawnY = -120;
    let lastBurst = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    function spawnParticle(x: number, y: number, drop = false) {
      if (!trail || trail.childElementCount >= TRAIL_LIMIT) return;
      const size = drop ? rand(5, 8) : rand(2.5, 5.5);
      const p = document.createElement("span");
      p.className = "bean-particle";
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.background =
        palette[Math.floor(Math.random() * palette.length)] || "var(--caramel)";
      if (drop) p.style.borderRadius = "62% 38% 55% 45% / 55% 62% 38% 45%";
      p.style.setProperty("--drift-x", `${rand(-16, 16)}px`);
      p.style.setProperty("--rise", `${rand(8, 26)}px`);
      p.style.animationDuration = `${rand(0.55, 1).toFixed(2)}s`;
      trail!.appendChild(p);
      p.addEventListener("animationend", () => p.remove(), { once: true });
    }

    function burst(x: number, y: number) {
      const now = performance.now();
      if (now - lastBurst < 700) return;
      lastBurst = now;
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2 + rand(-0.25, 0.25);
        const dist = rand(14, 30);
        spawnParticle(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, i % 3 === 0);
      }
    }

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        pos.x = target.x;
        pos.y = target.y;
        motion.prevX = target.x;
        motion.prevY = target.y;
        spawnX = target.x;
        spawnY = target.y;
        bean?.classList.add("bean-cursor-visible");
        shown = true;
      }
      const dx = e.clientX - spawnX;
      const dy = e.clientY - spawnY;
      if (dx * dx + dy * dy > 26 * 26) {
        spawnX = e.clientX + rand(-6, 6);
        spawnY = e.clientY + rand(-6, 6);
        spawnParticle(spawnX, spawnY);
        if (Math.random() < 0.3) {
          spawnParticle(e.clientX + rand(-10, 10), e.clientY + rand(-10, 10), true);
        }
      }
    }

    function onOver(e: MouseEvent) {
      const el = e.target as Element | null;
      if (!el || typeof el.closest !== "function") return;
      const interactive = el.closest(INTERACTIVE_SELECTOR);
      bean?.classList.toggle("bean-cursor-hover", !!interactive);
      const cta = el.closest(CTA_SELECTOR);
      if (cta) burst(e.clientX, e.clientY);
    }

    function onLeave() {
      bean?.classList.remove("bean-cursor-visible");
      shown = false;
      target.x = -120;
      target.y = -120;
    }

    function tick() {
      pos.x += (target.x - pos.x) * 0.35;
      pos.y += (target.y - pos.y) * 0.35;
      const vx = pos.x - motion.prevX;
      motion.prevX = pos.x;
      motion.prevY = pos.y;
      const targetTilt = Math.max(-18, Math.min(18, vx * 2.2));
      motion.tilt += (targetTilt - motion.tilt) * 0.2;
      const hoverScale = bean?.classList.contains("bean-cursor-hover") ? 1.35 : 1;
      motion.scale += (hoverScale - motion.scale) * 0.25;
      bean?.style.setProperty(
        "transform",
        `translate3d(${(pos.x - 15).toFixed(1)}px, ${(pos.y - 15).toFixed(1)}px, 0) rotate(${motion.tilt.toFixed(2)}deg) scale(${motion.scale.toFixed(3)})`,
      );
      raf = requestAnimationFrame(tick);
    }

    function enable() {
      if (running) return;
      running = true;
      root.classList.add("bean-cursor-active");

      trail = document.createElement("div");
      trail.className = "bean-trail";
      document.body.appendChild(trail);

      bean = document.createElement("div");
      bean.className = "bean-cursor";
      const img = document.createElement("div");
      img.className = "bean-cursor-img";
      img.style.backgroundImage = `url(${beanUrl})`;
      const ring = document.createElement("span");
      ring.className = "bean-cursor-ring";
      bean.appendChild(img);
      bean.appendChild(ring);
      document.body.appendChild(bean);

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
    }

    function disable() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      bean?.remove();
      trail?.remove();
      bean = null;
      trail = null;
      root.classList.remove("bean-cursor-active");
      shown = false;
    }

    function apply() {
      if (fineMq.matches && !reducedMq.matches) enable();
      else disable();
    }

    apply();
    fineMq.addEventListener("change", apply);
    reducedMq.addEventListener("change", apply);

    return () => {
      fineMq.removeEventListener("change", apply);
      reducedMq.removeEventListener("change", apply);
      disable();
    };
  }, []);

  return null;
}
