import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Menu as MenuIcon, X, Phone, MessageCircle, Clock, Leaf, ChefHat, Sofa, Zap, Star, MapPin,
  Instagram, Facebook, Mail, CheckCircle2,
} from "lucide-react";
import {
  images, specials, menu, chefList, reviews, branches, journal, gallery, MAIN_PHONE, MAIN_WHATSAPP, EMAIL,
} from "@/data/cafe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CHEF 11 — Organic Café | Crafted Flavours, Calm Space" },
      { name: "description", content: "CHEF 11 is a bright organic café serving specialty coffee, brunch and desserts. Visit our Karad and Wai branches or enquire about a franchise." },
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

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return <section id={id} className={`px-5 py-20 md:py-28 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>;
}
function Heading({ hand, title, sub }: { hand: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-hand text-2xl text-accent">{hand}</p>
      <h2 className="mt-1 text-4xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{sub}</p>}
    </div>
  );
}
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const btnPrimary = `${btn} bg-primary text-primary-foreground shadow-soft hover:bg-primary/90`;
const btnAccent = `${btn} bg-accent text-accent-foreground shadow-soft hover:bg-accent/90`;
const btnOutline = `${btn} border border-foreground/20 bg-card/70 text-foreground hover:bg-card`;

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Coffee");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

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

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled || open ? "bg-background/95 shadow-soft backdrop-blur" : "bg-transparent"}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
          <a href="#home" className="font-serif text-2xl font-bold tracking-wide">CHEF <span className="text-accent">11</span></a>
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="text-sm font-semibold hover:text-accent">{n}</a></li>)}
          </ul>
          <a href="#franchise" className={`${btnAccent} hidden lg:inline-flex`}>Franchise Enquiry</a>
          <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <MenuIcon />}
          </button>
        </nav>
        {open && (
          <ul className="space-y-1 px-5 pb-6 lg:hidden">
            {NAV.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-lg px-3 py-3 font-semibold hover:bg-muted">{n}</a></li>)}
            <li><a onClick={() => setOpen(false)} href="#franchise" className={`${btnAccent} mt-2 w-full`}>Franchise Enquiry</a></li>
          </ul>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={images.hero} alt="Sunlit CHEF 11 café interior with plants and rattan seating" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-veil absolute inset-0" />
        <div className="fade-up relative mx-auto w-full max-w-6xl px-5 pt-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/85 px-4 py-1.5 text-xs font-semibold shadow-soft"><Clock className="h-3.5 w-3.5 text-primary" /> Open 8 AM – 11 PM</span>
            <p className="mt-6 font-hand text-3xl text-accent">Where every cup feels like home</p>
            <h1 className="mt-2 text-5xl font-semibold leading-[1.05] md:text-7xl">Crafted Flavours in a Calm, Natural Space</h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className={btnPrimary}>View Menu</a>
              <a href="#franchise" className={btnOutline}>Franchise Enquiry</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img src={images.interior} alt="Coffee counter at CHEF 11" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
          <div>
            <p className="font-hand text-2xl text-accent">Our story</p>
            <h2 className="mt-1 text-4xl font-semibold md:text-5xl">A little green corner for slow mornings</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">CHEF 11 began with a simple idea — honest, organic food served in a space that lets you breathe. We source from local farms, roast our coffee with care and cook everything fresh, every day.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">Sunlight, plants and natural wood set the tone. Whether it's a quiet cup alone or a long brunch with friends, you'll always find a seat that feels like yours.</p>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              {[["11+", "Years of experience"], ["40+", "Signature dishes"], ["50K+", "Happy guests"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-card p-4 shadow-soft"><p className="font-serif text-3xl font-bold text-primary">{n}</p><p className="mt-1 text-xs text-muted-foreground">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SPECIALS */}
      <Section className="bg-secondary/60">
        <Heading hand="Chef recommends" title="Signature Specials" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specials.map((s) => (
            <article key={s.name} className="group overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="overflow-hidden"><img src={s.img} alt={s.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2"><h3 className="text-xl font-semibold">{s.name}</h3><span className="font-bold text-accent">{rupee(s.price)}</span></div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* MENU */}
      <Section id="menu">
        <Heading hand="Freshly made" title="Our Menu" sub="Everything prepared in-house with organic, seasonal ingredients." />
        <div role="tablist" aria-label="Menu categories" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 md:justify-center">
          {Object.keys(menu).map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary"}`}>{c}</button>
          ))}
        </div>
        <div key={cat} className="fade-up grid gap-x-12 gap-y-6 md:grid-cols-2">
          {(menu[cat] ?? []).map((i) => (
            <div key={i.name} className="flex gap-4 border-b border-dashed pb-5">
              <span aria-label={i.veg ? "Vegetarian" : "Non-vegetarian"} title={i.veg ? "Vegetarian" : "Non-vegetarian"}
                className={`mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ${i.veg ? "border-primary" : "border-destructive"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${i.veg ? "bg-primary" : "bg-destructive"}`} />
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3"><h3 className="text-xl font-semibold">{i.name}</h3><span className="font-bold text-accent">{rupee(i.price)}</span></div>
                <p className="text-sm text-muted-foreground">{i.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section className="bg-secondary/60">
        <Heading hand="The CHEF 11 way" title="Why Choose Us" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Leaf, "Fresh Ingredients", "Organic produce from local farms, delivered daily."],
            [ChefHat, "Expert Chefs", "A passionate team with decades of combined craft."],
            [Sofa, "Cozy Ambience", "Sunlight, greenery and seats you'll never want to leave."],
            [Zap, "Quick Service", "Freshly made, warmly served — without the wait."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Leaf;
            return (
              <div key={t as string} className="rounded-3xl bg-card p-7 text-center shadow-soft">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"><I /></span>
                <h3 className="mt-4 text-2xl font-semibold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery">
        <Heading hand="Moments" title="Gallery" />
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`} className="mb-4 block w-full overflow-hidden rounded-2xl shadow-soft">
              <img src={g} alt={`CHEF 11 café photo ${i + 1}`} loading="lazy" className={`w-full object-cover transition-transform duration-700 hover:scale-105 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`} />
            </button>
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
      <Section id="chefs" className="bg-secondary/60">
        <Heading hand="The hands behind it" title="Meet Our Chefs" />
        <div className="grid gap-8 sm:grid-cols-3">
          {chefList.map((c) => (
            <div key={c.name} className="text-center">
              <img src={images.chefs} alt={`${c.name}, ${c.role}`} loading="lazy" style={{ objectPosition: c.pos }} className="mx-auto aspect-[4/5] w-full max-w-xs rounded-[2rem] object-cover shadow-soft" />
              <h3 className="mt-5 text-2xl font-semibold">{c.name}</h3>
              <p className="font-hand text-xl text-accent">{c.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OFFER */}
      <section className="bg-primary px-5 py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-hand text-2xl text-gold">Weekday mornings</p>
            <h2 className="text-3xl font-semibold md:text-4xl">Free cookie with every coffee before 11 AM</h2>
          </div>
          <a href="#branches" className={`${btn} bg-card text-foreground hover:bg-background`}>Find Your Nearest Café</a>
        </div>
      </section>

      {/* REVIEWS */}
      <Section>
        <Heading hand="Kind words" title="Guest Reviews" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="rounded-3xl bg-card p-7 shadow-soft">
              <div className="flex gap-1 text-gold" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.stars ? "fill-current" : "opacity-30"}`} />)}
              </div>
              <blockquote className="mt-4 font-serif text-xl leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* BRANCHES */}
      <Section id="branches" className="bg-secondary/60">
        <Heading hand="Visit us" title="Our Branches" sub="Contact details are being finalised and will be updated soon." />
        <div className="grid gap-6 md:grid-cols-2">
          {branches.map((b) => (
            <div key={b.city} className="rounded-3xl bg-card p-8 shadow-soft">
              <h3 className="text-3xl font-semibold">{b.city}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{b.address}</li>
                <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" />Phone to be updated</li>
                <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" />{b.hours}</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${b.phone}`} className={btnPrimary}><Phone className="h-4 w-4" />Call</a>
                <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" className={btnOutline}><MessageCircle className="h-4 w-4" />WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FRANCHISE */}
      <Section id="franchise">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-hand text-2xl text-accent">Grow with us</p>
            <h2 className="mt-1 text-4xl font-semibold md:text-5xl">Bring CHEF 11 to your city</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">We're looking for passionate partners who share our love for honest food and calm spaces. You'll get our recipes, training, design guidance and ongoing support.</p>
            <img src={images.brunch} alt="Brunch spread at CHEF 11" loading="lazy" className="mt-8 aspect-[16/10] w-full rounded-3xl object-cover shadow-soft" />
          </div>
          <div className="rounded-3xl bg-card p-7 shadow-soft md:p-9">
            {sent ? (
              <div role="status" className="flex h-full flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h3 className="mt-4 text-3xl font-semibold">Thank you!</h3>
                <p className="mt-2 text-muted-foreground">Your enquiry has been received. Our team will get in touch shortly.</p>
                <button onClick={() => setSent(false)} className={`${btnOutline} mt-6`}>Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {[["name", "Full name", "text"], ["phone", "Phone", "tel"], ["email", "Email", "email"], ["city", "Preferred city", "text"]].map(([id, label, type]) => (
                  <div key={id}>
                    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
                    <input id={id} name={id} type={type} required className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <button type="submit" className={`${btnAccent} w-full`}>Send Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* JOURNAL */}
      <Section className="bg-secondary/60">
        <Heading hand="Stories" title="From the Journal" />
        <div className="grid gap-6 md:grid-cols-3">
          {journal.map((j) => (
            <article key={j.title} className="overflow-hidden rounded-3xl bg-card shadow-soft">
              <img src={j.img} alt={j.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-olive">{j.date}</p>
                <h3 className="mt-2 text-2xl font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer id="contact" className="border-t bg-card px-5 pb-28 pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-3xl font-bold">CHEF <span className="text-accent">11</span></p>
            <p className="mt-3 text-sm text-muted-foreground">An organic café serving crafted coffee and fresh food in a calm, natural space.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="text-muted-foreground hover:text-accent">{n}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Opening hours</h3>
            <p className="mt-3 text-sm text-muted-foreground">Monday – Sunday<br />8:00 AM – 11:00 PM</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href={`tel:${MAIN_PHONE}`} className="flex items-center gap-2 hover:text-accent"><Phone className="h-4 w-4" />Phone to be updated</a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-accent"><Mail className="h-4 w-4" />{EMAIL}</a></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-muted p-2.5 hover:text-accent"><Instagram className="h-4 w-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-muted p-2.5 hover:text-accent"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
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
