import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  Menu as MenuIcon, X, Phone, MessageCircle, Clock, Leaf, ChefHat, Sofa, Zap, Star, MapPin,
  Instagram, Facebook, Mail, CheckCircle2, ChevronLeft, ChevronRight, ArrowUpRight, Twitter,
} from "lucide-react";
import {
  images, specials, menu, chefList, reviews, branches, journal, gallery, MAIN_PHONE, MAIN_WHATSAPP, EMAIL,
} from "@/data/cafe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHEF 11 — Organic Café | Crafted Flavours, Calm Space" },
      { name: "description", content: "CHEF 11 is an organic café serving specialty coffee, brunch and desserts. Visit our Karad and Wai branches or enquire about a franchise." },
      { property: "og:title", content: "CHEF 11 — Organic Café" },
      { property: "og:description", content: "Where every cup feels like home. Specialty coffee, fresh brunch and a calm, natural space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["Home", "About", "Menu", "Chefs", "Gallery", "Branches", "Franchise", "Contact"];
const rupee = (n: number) => `₹${n}`;

function Wave({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden className={`block h-12 w-full md:h-20 ${flip ? "rotate-180" : ""} ${className}`}>
      <path fill="currentColor" d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z" />
    </svg>
  );
}
function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`px-5 py-20 md:py-24 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}
function Heading({ hand, title, sub }: { hand: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="font-hand text-2xl text-caramel">{hand}</p>
      <h2 className="mt-1 text-4xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

/** Fades children up when they scroll into view. `delay` staggers the entrance (ms). */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`reveal ${shown ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const btnAccent = `${btn} bg-accent text-accent-foreground shadow-soft hover:bg-accent/90`;
const btnGhostLight = `${btn} border border-forest-foreground/60 text-forest-foreground hover:bg-forest-foreground/10`;
const btnOutline = `${btn} border border-foreground/20 bg-card text-foreground hover:bg-muted`;

function useCountdown() {
  const [t, setT] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(11, 0, 0, 0);
      if (end <= now) end.setDate(end.getDate() + 1);
      while (end.getDay() === 0 || end.getDay() === 6) end.setDate(end.getDate() + 1);
      const s = Math.floor((end.getTime() - now.getTime()) / 1000);
      setT([Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60]);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Coffee");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [rev, setRev] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const cd = useCountdown();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lightbox]);

  const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); };
  const solid = scrolled || open;
  const r = reviews[rev]!;

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${solid ? "bg-background/95 text-foreground shadow-soft backdrop-blur" : "bg-transparent text-forest-foreground"}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
          <a href="#home" className="font-serif text-2xl font-bold tracking-[0.2em]">CHEF <span className="text-caramel">11</span></a>
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="link-underline text-sm font-semibold transition-colors hover:text-caramel">{n}</a></li>)}
          </ul>
          <a href="#franchise" className={`${btnAccent} hidden lg:inline-flex`}>Franchise Enquiry</a>
          <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <MenuIcon />}</button>
        </nav>
        {open && (
          <ul className="space-y-1 px-5 pb-6 lg:hidden">
            {NAV.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-lg px-3 py-3 font-semibold hover:bg-muted">{n}</a></li>)}
            <li><a onClick={() => setOpen(false)} href="#franchise" className={`${btnAccent} mt-2 w-full`}>Franchise Enquiry</a></li>
          </ul>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-[88vh] items-center overflow-hidden">
        <img src={images.hero} alt="CHEF 11 café interior with plants and warm lighting" width={1920} height={1088} className="ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="hero-dark absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-28 text-forest-foreground">
          <div className="max-w-xl">
            <p className="fade-up font-hand text-2xl text-gold">Where every cup feels like home</p>
            <h1 className="fade-up mt-2 text-5xl font-semibold leading-[1.05] md:text-6xl" style={{ animationDelay: "0.15s" }}>Crafted Flavours in a Calm, Natural Space</h1>
            <p className="fade-up mt-4 max-w-md text-sm opacity-90" style={{ animationDelay: "0.3s" }}>Organic coffee, slow brunches and fresh-baked comfort — served in a sunlit space full of greenery.</p>
            <div className="fade-up mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
              <a href="#menu" className={btnAccent}>View Menu</a>
              <a href="#franchise" className={btnGhostLight}>Franchise Enquiry</a>
            </div>
            <div className="fade-up mt-8 inline-flex items-center gap-3 rounded-full bg-card px-5 py-2.5 text-foreground shadow-soft" style={{ animationDelay: "0.6s" }}>
              <Clock className="h-4 w-4 text-primary" />
              <div className="leading-tight"><p className="text-[10px] uppercase tracking-widest text-muted-foreground">Open daily</p><p className="text-sm font-bold">8 AM – 11 PM</p></div>
            </div>
          </div>
        </div>
        <Wave className="absolute inset-x-0 bottom-0 text-background" />
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal className="relative grid grid-cols-2 items-end gap-4">
            <img src={images.hero} alt="Dining area at CHEF 11" loading="lazy" className="aspect-[3/4] w-full rounded-t-full rounded-b-3xl object-cover shadow-soft transition-transform duration-700 hover:scale-[1.03]" />
            <img src={images.interior} alt="Coffee counter at CHEF 11" loading="lazy" className="aspect-[3/5] w-full rounded-t-full rounded-b-3xl object-cover shadow-soft transition-transform duration-700 hover:scale-[1.03]" />
            <div className="float-soft absolute -bottom-6 right-4 rounded-2xl bg-forest p-4 text-forest-foreground shadow-soft">
              <p className="font-hand text-2xl text-gold">Since 2015</p>
              <p className="text-xs opacity-90">Serving Maharashtra with love</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="font-hand text-2xl text-caramel">Our story</p>
            <h2 className="mt-1 text-4xl font-semibold md:text-[2.6rem] md:leading-tight">A café shaped like a sand dune, run like a family kitchen</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">CHEF 11 began with a simple idea — honest, organic food served in a space that lets you breathe. We source from local farms, roast our coffee with care and cook everything fresh, every day.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sunlight, plants and natural wood set the tone. Whether it's a quiet cup alone or a long brunch with friends, you'll always find a seat that feels like yours.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
              {[["11+", "Years of experience"], ["64", "Signature dishes"], ["24K+", "Happy guests"]].map(([n, l]) => (
                <div key={l}><p className="font-serif text-4xl font-semibold text-primary">{n}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{l}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SPECIALS */}
      <Section>
        <Heading hand="Chef recommends" title="Signature Specials" sub="Our most-loved plates and cups, made fresh every day." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specials.map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <article className="card-hover group h-full overflow-hidden rounded-3xl bg-card shadow-soft">
                <div className="relative overflow-hidden">
                  <img src={s.img} alt={s.name} loading="lazy" className="img-zoom aspect-[4/3] w-full object-cover" />
                  <span className="absolute right-3 top-3 rounded-full bg-card p-1.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"><Leaf className="h-3.5 w-3.5 text-primary" /></span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-caramel">{s.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                  <p className="mt-3 font-bold text-accent">{rupee(s.price)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* MENU */}
      <div className="text-sand"><Wave className="" /></div>
      <section id="menu" className="bg-sand px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <Heading hand="Freshly made" title="Our Food Menu" />
          <div role="tablist" aria-label="Menu categories" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 md:justify-center">
            {Object.keys(menu).map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${cat === c ? "bg-forest text-forest-foreground" : "bg-card hover:bg-muted"}`}>{c}</button>
            ))}
          </div>
          <div key={cat} className="fade-up grid gap-x-12 gap-y-5 md:grid-cols-2">
            {(menu[cat] ?? []).map((i, idx) => (
              <div key={i.name} className="flex items-center gap-4 rounded-2xl p-2 transition-colors duration-300 hover:bg-card/70">
                <img src={specials[idx % specials.length]!.img} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover shadow-soft transition-transform duration-500 hover:scale-110" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span aria-label={i.veg ? "Vegetarian" : "Non-vegetarian"} title={i.veg ? "Vegetarian" : "Non-vegetarian"}
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border-2 ${i.veg ? "border-primary" : "border-destructive"}`}>
                      <span className={`h-1 w-1 rounded-full ${i.veg ? "bg-primary" : "bg-destructive"}`} />
                    </span>
                    <h3 className="text-lg font-semibold">{i.name}</h3>
                    <span className="mx-1 flex-1 border-b border-dotted border-foreground/30" />
                    <span className="font-bold text-accent">{rupee(i.price)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="text-sand"><Wave className="" flip /></div>

      {/* WHY */}
      <Section>
        <Heading hand="The CHEF 11 way" title="Why Guests Keep Coming Back" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {([[Leaf, "Fresh Ingredients", "Organic produce from local farms, delivered daily."],
            [ChefHat, "Expert Chefs", "A passionate team with decades of combined craft."],
            [Sofa, "Cozy Ambience", "Sunlight, greenery and seats you'll never want to leave."],
            [Zap, "Quick Service", "Freshly made, warmly served — without the wait."]] as const).map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="card-hover group h-full rounded-3xl bg-sand p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-card text-caramel transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"><I className="h-5 w-5" /></span>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="pt-0">
        <Heading hand="Gallery" title="A Look Inside Chef 11" />
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-3">
          {gallery.slice(0, 7).map((g, i) => (
            <Reveal key={i} delay={i * 80} className={`${i === 0 ? "row-span-2" : ""} ${i === 5 ? "row-span-2" : ""}`}>
              <button onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`}
                className="group h-full w-full overflow-hidden rounded-2xl shadow-soft">
                <img src={g} alt={`CHEF 11 café photo ${i + 1}`} loading="lazy" className="img-zoom h-full w-full object-cover" />
              </button>
            </Reveal>
          ))}
        </div>
      </Section>
      {lightbox !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4" onClick={() => setLightbox(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-card p-2"><X /></button>
          <img src={gallery[lightbox]} alt="Enlarged café photo" className="max-h-[85vh] max-w-full rounded-2xl" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} />
        </div>
      )}

      {/* CHEFS */}
      <div className="text-sand"><Wave className="" /></div>
      <section id="chefs" className="bg-sand px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <Heading hand="Our team" title="Meet Our Chefs" />
          <div className="grid gap-8 sm:grid-cols-3">
            {chefList.map((c) => (
              <div key={c.name} className="text-center">
                <img src={images.chefs} alt={`${c.name}, ${c.role}`} loading="lazy" style={{ objectPosition: c.pos }} className="mx-auto aspect-[3/4] w-full max-w-xs rounded-t-full rounded-b-3xl object-cover shadow-soft" />
                <h3 className="mt-5 text-xl font-semibold">{c.name}</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.role}</p>
                <div className="mt-3 flex justify-center gap-2">
                  {[Instagram, Facebook, Twitter].map((S, k) => <a key={k} href="https://instagram.com" target="_blank" rel="noreferrer" aria-label={`${c.name} social profile`} className="rounded-full bg-card p-2 hover:text-caramel"><S className="h-3.5 w-3.5" /></a>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-forest px-5 py-16 text-forest-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="font-hand text-2xl text-gold">Limited offer</p>
            <h2 className="text-3xl font-semibold md:text-4xl">25% off every weekday brunch, 8 AM to 11 AM</h2>
            <p className="mt-2 text-sm opacity-85">Mention this offer at the counter. Valid at all branches.</p>
            <a href="#branches" className={`${btn} mt-5 bg-gold text-foreground hover:bg-gold/90`}>Claim the offer</a>
          </div>
          <div className="flex gap-3" aria-label="Time left until offer ends">
            {cd.map((v, i) => (
              <div key={i} className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-forest-foreground/40">
                <span className="font-serif text-xl font-semibold">{String(v).padStart(2, "0")}</span>
                <span className="text-[9px] uppercase tracking-wider opacity-80">{["Days", "Hrs", "Min", "Sec"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Section>
        <Heading hand="Testimonials" title="What Our Guests Say" />
        <figure className="mx-auto max-w-2xl rounded-3xl bg-card p-10 text-center shadow-soft">
          <blockquote key={rev} className="fade-up font-serif text-2xl leading-snug">“{r.text}”</blockquote>
          <div className="mt-5 flex justify-center gap-1 text-gold" aria-label={`${r.stars} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.stars ? "fill-current" : "opacity-30"}`} />)}
          </div>
          <figcaption className="mt-2 text-sm font-semibold">{r.name}<span className="block text-xs font-normal text-muted-foreground">Regular guest</span></figcaption>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button aria-label="Previous review" onClick={() => setRev((rev - 1 + reviews.length) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            {reviews.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === rev ? "w-6 bg-accent" : "w-1.5 bg-border"}`} />)}
            <button aria-label="Next review" onClick={() => setRev((rev + 1) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </figure>
      </Section>

      {/* BRANCHES */}
      <Section id="branches" className="pt-0">
        <Heading hand="Find us" title="Our Branches" sub="Two calm corners in Maharashtra. Contact details will be updated soon." />
        <div className="grid gap-6 md:grid-cols-2">
          {branches.map((b) => (
            <div key={b.city} className="rounded-3xl bg-sand p-7 shadow-soft">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold">Chef 11 · {b.city}</h3>
                <a href={`tel:${b.phone}`} aria-label={`Call ${b.city}`} className="rounded-full bg-forest p-2 text-forest-foreground"><ArrowUpRight className="h-4 w-4" /></a>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{b.address}</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" />Phone to be updated</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" />{b.hours}</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${b.phone}`} className={`${btnAccent} px-5 py-2`}><Phone className="h-4 w-4" />Call</a>
                <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" className={`${btnOutline} px-5 py-2`}><MessageCircle className="h-4 w-4" />WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FRANCHISE */}
      <div className="text-sand"><Wave className="" /></div>
      <section id="franchise" className="bg-sand px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <img src={images.hero} alt="CHEF 11 café" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
          <div>
            <p className="font-hand text-2xl text-caramel">Partner with us</p>
            <h2 className="text-4xl font-semibold">Franchise Enquiry</h2>
            <p className="mt-2 text-sm text-muted-foreground">Bring the calm of CHEF 11 to your city. Share your details and our team will reach out.</p>
            {sent ? (
              <div role="status" className="mt-6 rounded-3xl bg-card p-10 text-center shadow-soft">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-3 text-2xl font-semibold">Thank you!</h3>
                <p className="mt-1 text-sm text-muted-foreground">Your enquiry has been received. We'll be in touch shortly.</p>
                <button onClick={() => setSent(false)} className={`${btnOutline} mt-5`}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                {[["name", "Full name", "text"], ["phone", "Phone", "tel"]].map(([id, label, type]) => (
                  <div key={id}><label htmlFor={id} className="mb-1 block text-xs font-semibold">{label}</label>
                    <input id={id} name={id} type={type} required className="w-full rounded-full border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
                ))}
                <div className="sm:col-span-2"><label htmlFor="email" className="mb-1 block text-xs font-semibold">Email</label>
                  <input id="email" name="email" type="email" required className="w-full rounded-full border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
                <div className="sm:col-span-2"><label htmlFor="city" className="mb-1 block text-xs font-semibold">Preferred city</label>
                  <select id="city" name="city" required className="w-full rounded-full border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
                    {["Pune", "Mumbai", "Satara", "Kolhapur", "Nashik", "Other"].map((c) => <option key={c}>{c}</option>)}
                  </select></div>
                <div className="sm:col-span-2"><label htmlFor="message" className="mb-1 block text-xs font-semibold">Message</label>
                  <textarea id="message" name="message" rows={3} className="w-full rounded-2xl border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
                <button type="submit" className={`${btnAccent} sm:col-span-2`}>Send Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <div className="text-sand"><Wave className="" flip /></div>

      {/* JOURNAL */}
      <Section>
        <Heading hand="Journal" title="Latest From Chef 11" />
        <div className="grid gap-6 md:grid-cols-3">
          {journal.map((j) => (
            <article key={j.title} className="overflow-hidden rounded-3xl bg-card shadow-soft">
              <img src={j.img} alt={j.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-olive">{j.date}</p>
                <h3 className="mt-2 text-xl font-semibold">{j.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{j.excerpt}</p>
                <a href="#home" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">Read more <ArrowUpRight className="h-3 w-3" /></a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer id="contact" className="bg-forest px-5 pb-28 pt-16 text-forest-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl font-bold tracking-[0.2em]">CHEF <span className="text-gold">11</span></p>
            <p className="mt-3 text-sm opacity-80">An organic café serving crafted coffee and fresh food in a calm, natural space.</p>
            <div className="mt-4 flex gap-2">
              {[[Instagram, "https://instagram.com", "Instagram"], [Facebook, "https://facebook.com", "Facebook"], [Twitter, "https://x.com", "X"]].map(([S, h, l]) => {
                const I = S as typeof Instagram;
                return <a key={l as string} href={h as string} target="_blank" rel="noreferrer" aria-label={l as string} className="rounded-full border border-forest-foreground/30 p-2 hover:text-gold"><I className="h-4 w-4" /></a>;
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-1.5 text-sm">{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="opacity-80 hover:text-gold hover:opacity-100">{n}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Visit</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-85">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />Karad & Wai, Maharashtra</li>
              <li><a href={`tel:${MAIN_PHONE}`} className="flex gap-2 hover:text-gold"><Phone className="h-4 w-4" />Phone to be updated</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex gap-2 hover:text-gold"><Mail className="h-4 w-4" />{EMAIL}</a></li>
              <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0" />Mon – Sun, 8 AM – 11 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="mt-3 text-sm opacity-80">Seasonal menus and offers, once a month.</p>
            {subscribed ? <p role="status" className="mt-4 text-sm text-gold">Thanks for subscribing!</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="mt-4 flex gap-2">
                <label htmlFor="news" className="sr-only">Email address</label>
                <input id="news" type="email" required placeholder="Your email" className="min-w-0 flex-1 rounded-full bg-forest-foreground/10 px-4 py-2 text-sm placeholder:text-forest-foreground/60 outline-none focus:ring-2 focus:ring-gold" />
                <button className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-foreground">Join</button>
              </form>
            )}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-2 border-t border-forest-foreground/20 pt-6 text-xs opacity-80 sm:flex-row">
          <p>© {new Date().getFullYear()} CHEF 11. All rights reserved.</p>
          <p>Designed by Advert Ninjaa</p>
        </div>
      </footer>

      {/* FLOATING */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a href={`https://wa.me/${MAIN_WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-105"><MessageCircle /></a>
        <a href={`tel:${MAIN_PHONE}`} aria-label="Call CHEF 11" className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft transition hover:scale-105"><Phone /></a>
      </div>
    </div>
  );
}
