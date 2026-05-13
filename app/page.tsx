"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Bitcoin,
  CalendarClock,
  Camera,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  Gem,
  Heart,
  KeyRound,
  Layers,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  PartyPopper,
  Phone,
  Mail,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Timer,
  VenetianMask,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SITE } from "@/lib/site";

/** Local portraits in /public/leslie (copied from project root WhatsApp exports). */
const GALLERY_COUNT = 18;
const galleryImages = Array.from({ length: GALLERY_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/leslie/${n}.jpeg`;
});

const WHATSAPP_URL = `https://wa.me/${SITE.phoneDigitsWa}`;
const TELEGRAM_URL = "https://t.me/leslie_newyork";

/** ~1,500 characters — enticing, professional companion framing */
const ABOUT_COPY =
  "Step into a world where Manhattan finally exhales—and you exhale with it. I'm Leslie: twenty-six, curious, kinetic, and unapologetically present. My take on companionship is what discerning friends whisper about as the gold standard of GFE: warm, intuitive, and deliciously high-energy. Think rooftop laughter that turns into slow dancing, spontaneous midnight gallery hops, and a spirited “wet & wild” chemistry in the best sense—playful, immersive, and never rushed. I adore building connection over time, letting conversations unravel and inside jokes stack like champagne flutes. Adventure is my love language: passport-ready for global itineraries, discreet worldwide fly-outs, and itineraries where every detail feels effortless on your side. Whether we're closing down a private lounge or stealing an hour between meetings, you'll find me polished in public, genuine in private, and attentive to the cues that make an evening unforgettable. Discretion is sacred; chemistry is everything. If you value artistry in conversation, appetite for life, and a woman who meets you at full voltage—welcome. Expect thoughtful planning, lingering presence, and a voice that quiets the static in your head. For gentlemen who understand that luxury is less about logos and more about time well spent, I offer a sanctuary carved from velvet shadows and city light. Reach out with intention; I'll meet you with mine—and we'll design your ultimate New York escape, then decide where the skyline takes us next.";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    title: "Girlfriend Experience (GFE)",
    desc: "Warm, intuitive companionship with natural flow and zero clock-watching energy.",
    icon: Heart,
  },
  {
    title: "Deep Connection & Intimacy",
    desc: "Attentive, confident presence tailored to your pace and preferences.",
    icon: Flame,
  },
  {
    title: "Nightlife & Social Events",
    desc: "Effortless plus-one energy for lounges, openings, and upscale gatherings.",
    icon: PartyPopper,
  },
  {
    title: "French Kissing & Affection",
    desc: "Romantic, tactile chemistry for those who crave genuine closeness.",
    icon: Sparkles,
  },
  {
    title: "Role-play & Fantasy",
    desc: "Discreet scenarios and wardrobe touches—discussed clearly and respectfully.",
    icon: VenetianMask,
  },
  {
    title: "Domination / Submission",
    desc: "Power-exchange play with firm boundaries, safewords, and mutual trust.",
    icon: KeyRound,
  },
] as const;

const rates = [
  { duration: "90 minutes", incall: "$900", outcall: "$1,000" },
  { duration: "2 hours", incall: "$1,200", outcall: "$1,350" },
  { duration: "3 hours", incall: "$1,700", outcall: "$1,900" },
  { duration: "Overnight", incall: "$4,500", outcall: "$5,000" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#menu", label: "Menu" },
  { href: "#rates", label: "Rates" },
  { href: "#booking", label: "Book" },
  { href: "#payments", label: "Pay" },
  { href: "#contact", label: "Contact" },
] as const;

function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          type: String(fd.get("type") ?? ""),
          duration: String(fd.get("duration") ?? ""),
          datetime: String(fd.get("datetime") ?? ""),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Could not send request");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <p className="rounded-lg border border-white/5 bg-noir-900/40 px-4 py-3 text-xs leading-relaxed text-zinc-500">
        Your request is emailed to{" "}
        <a href={`mailto:${SITE.email}`} className="text-gold/90 underline-offset-2 hover:underline">
          {SITE.email}
        </a>
        . If anything fails, use WhatsApp or call below.
      </p>
      <div>
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
          Name
        </label>
        <input id="name" name="name" required className="input-field" placeholder="Your first name" />
      </div>
      <div>
        <label htmlFor="type" className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
          Meeting type
        </label>
        <select id="type" name="type" className="input-field" defaultValue="outcall">
          <option value="incall">Incall</option>
          <option value="outcall">Outcall</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration" className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
          Duration
        </label>
        <select id="duration" name="duration" className="input-field" defaultValue="2h">
          <option value="90m">90 minutes</option>
          <option value="2h">2 hours</option>
          <option value="3h">3 hours</option>
          <option value="overnight">Overnight</option>
          <option value="custom">Custom — note below</option>
        </select>
      </div>
      <div>
        <label htmlFor="datetime" className="mb-2 block text-xs uppercase tracking-widest text-zinc-500">
          Preferred date &amp; time
        </label>
        <input
          id="datetime"
          name="datetime"
          type="text"
          required
          className="input-field"
          placeholder="e.g. Thu June 12, 8:00 PM ET"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gradient-to-r from-gold-dim via-gold to-gold-dim py-4 text-sm font-semibold uppercase tracking-widest text-noir-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit request"}
      </button>
      {status === "success" ? (
        <p className="text-center text-sm text-emerald-400/90" role="status">
          Thank you—your booking details were sent to {SITE.email}. Leslie will follow up shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-center text-sm text-crimson-glow" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

function Lightbox({
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir-950/96 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery enlarged view"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-[102] rounded-full border border-white/15 p-2 text-zinc-300 transition hover:border-gold/40 hover:text-gold"
        aria-label="Close gallery"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="absolute left-2 top-1/2 z-[102] -translate-y-1/2 rounded-full border border-white/10 bg-noir-900/80 p-3 text-gold transition hover:bg-noir-800 md:left-6"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 z-[102] -translate-y-1/2 rounded-full border border-white/10 bg-noir-900/80 p-3 text-gold transition hover:bg-noir-800 md:right-6"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight className="h-7 w-7" />
      </button>
      <div
        className="relative z-[101] h-[min(85vh,900px)] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative h-full w-full"
          >
            <Image
              src={galleryImages[index]}
              alt={`Leslie — gallery ${index + 1} of ${total}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-0 left-0 right-0 text-center text-xs uppercase tracking-[0.3em] text-zinc-500">
          {index + 1} / {total}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const n = galleryImages.length;
  const goHero = useCallback(
    (dir: -1 | 1) => setHeroIndex((i) => (i + dir + n) % n),
    [n],
  );
  const goLightbox = useCallback(
    (dir: -1 | 1) =>
      setLightbox((cur) => (cur === null ? null : (cur + dir + n) % n)),
    [n],
  );

  useEffect(() => {
    if (heroPaused || lightbox !== null) return;
    const t = window.setInterval(() => setHeroIndex((i) => (i + 1) % n), 5500);
    return () => window.clearInterval(t);
  }, [heroPaused, lightbox, n]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-noir-950 bg-noir-radial">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noir-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#" className="font-serif text-xl tracking-[0.2em] text-gold-light">
            LESLIE
          </a>
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 md:flex">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="transition hover:text-gold">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="rounded-full border border-gold/40 bg-gold/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-gold transition hover:bg-gold/20 sm:px-4 sm:text-xs"
            >
              Book Now
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-white/5 bg-noir-950/95 px-5 py-6 md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="py-1 transition hover:text-gold"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section className="relative pt-28 md:pt-36">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-2 md:items-center md:gap-16 md:pb-28">
          <FadeIn>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-crimson-glow">
              <MapPin className="h-4 w-4" aria-hidden />
              New York · By Appointment
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Leslie:{" "}
              <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dim bg-clip-text text-transparent">
                The Ultimate New York Escape.
              </span>
            </h1>
            <div className="gold-line my-8" />
            <p className="max-w-md text-lg font-light leading-relaxed text-zinc-400">
              Luxury noir evenings for the selective gentleman. No-rush chemistry,
              world-class discretion, and a presence that lingers long after the city
              goes quiet.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-dim via-gold to-gold-dim px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-noir-950 shadow-lg shadow-gold/10 transition hover:brightness-110"
              >
                Book Now
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-zinc-300 transition hover:border-gold/40 hover:text-gold"
              >
                Discover More
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div
              className="relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-crimson/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
                <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-noir-800 to-noir-950">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={heroIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <button
                        type="button"
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        aria-label="Open image in gallery viewer"
                        onClick={() => setLightbox(heroIndex)}
                      />
                      <Image
                        src={galleryImages[heroIndex]}
                        alt={`Leslie — portrait ${heroIndex + 1}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={heroIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20">
                    <p className="font-serif text-lg text-white/90">Leslie · 26</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold/80">
                      Elite Companion
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">
                      Tap to expand · Slideshow
                    </p>
                  </div>
                  <div className="absolute bottom-24 right-4 z-20 flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goHero(-1);
                      }}
                      className="rounded-full border border-white/15 bg-noir-950/70 p-2 text-gold backdrop-blur transition hover:border-gold/40"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goHero(1);
                      }}
                      className="rounded-full border border-white/15 bg-noir-950/70 p-2 text-gold backdrop-blur transition hover:border-gold/40"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="border-t border-white/5 bg-noir-900/90 px-2 py-3">
                  <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {galleryImages.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          setHeroIndex(i);
                          setHeroPaused(true);
                        }}
                        className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-14 ${
                          i === heroIndex
                            ? "border-gold shadow-[0_0_20px_rgba(201,169,98,0.25)]"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`Show photo ${i + 1}`}
                        aria-current={i === heroIndex}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1">
                    <a
                      href="#gallery"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90 transition hover:text-gold"
                    >
                      Full gallery
                    </a>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">
                      {heroIndex + 1} / {n}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-white/5 bg-noir-900/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <Gem className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/90">
                About Me
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white md:text-4xl">
              Chemistry, curiosity, and{" "}
              <span className="text-crimson-glow">no-rush</span> luxury
            </h2>
            <div className="gold-line my-8" />
            <p className="whitespace-pre-line text-base font-light leading-[1.85] text-zinc-400">
              {ABOUT_COPY}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        className="scroll-mt-24 border-t border-white/5 bg-gradient-to-b from-noir-950 to-noir-900/50 py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <Camera className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/90">
                Visual diary
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white md:text-4xl">Gallery</h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-500">
              A glimpse of evenings in motion—click any frame for a full-screen view.
            </p>
            <div className="gold-line my-8" />
          </FadeIn>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryImages.map((src, i) => (
              <FadeIn
                key={src}
                delay={(i % 8) * 0.03}
                className={i % 5 === 0 ? "col-span-2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-noir-900 shadow-lg transition hover:border-gold/30 hover:shadow-gold/5 ${
                    i % 5 === 0
                      ? "aspect-[16/11] sm:aspect-[5/3] md:aspect-[16/9]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Leslie gallery ${i + 1}`}
                    fill
                    className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/10 bg-noir-950/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <ZoomIn className="h-3 w-3" aria-hidden />
                    View
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center">
                <Crown className="h-5 w-5 text-gold" aria-hidden />
              </div>
              <h2 className="font-serif text-3xl text-white md:text-4xl">The Menu</h2>
              <p className="mt-4 text-sm text-zinc-500">
                Curated experiences—always discussed with clarity, consent, and
                mutual respect.
              </p>
              <div className="gold-line mx-auto my-8" />
            </div>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-white/8 bg-noir-850/60 p-6 transition hover:border-gold/25 hover:bg-noir-800/80">
                  <s.icon
                    className="mb-4 h-8 w-8 text-gold/90 transition group-hover:text-gold"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="font-serif text-xl text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Rates & Policies */}
      <section id="rates" className="scroll-mt-24 border-t border-white/5 bg-noir-900/30 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <Timer className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/90">
                Rates & Policies
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white md:text-4xl">
              Incall &amp; outcall
            </h2>
            <p className="mt-3 max-w-xl text-sm text-zinc-500">
              Indicative tribute for Manhattan. Extended dates, travel, and fly-outs
              quoted individually.
            </p>
            <div className="gold-line my-8" />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-noir-850/90 text-xs uppercase tracking-widest text-gold/90">
                    <th className="px-5 py-4 font-semibold">Duration</th>
                    <th className="px-5 py-4 font-semibold">Incall</th>
                    <th className="px-5 py-4 font-semibold">Outcall</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-noir-900/50">
                  {rates.map((row) => (
                    <tr key={row.duration} className="text-zinc-300">
                      <td className="px-5 py-4 font-medium text-white">{row.duration}</td>
                      <td className="px-5 py-4 text-gold-light">{row.incall}</td>
                      <td className="px-5 py-4 text-gold-light">{row.outcall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-10 flex gap-4 rounded-2xl border border-crimson/25 bg-crimson/5 p-6 md:p-8">
              <ShieldCheck
                className="mt-1 h-10 w-10 shrink-0 text-crimson-glow"
                strokeWidth={1.25}
                aria-hidden
              />
              <div>
                <h3 className="font-serif text-xl text-white">Safety &amp; discretion</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  For <strong className="text-zinc-200">first-time clients</strong>, a{" "}
                  <strong className="text-gold-light">non-refundable booking fee</strong>{" "}
                  is required before confirmation. This protects mutual safety,
                  filters timewasters, and supports careful screening. Details are shared
                  after your inquiry. Repeat guests may qualify for streamlined
                  arrangements. All information is handled with strict confidentiality.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Booking form */}
      <section id="booking" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-xl px-5">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/90">
                Request a Date
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white md:text-4xl">Booking</h2>
            <p className="mt-3 text-sm text-zinc-500">
              Share your details—I reply to thoughtful introductions first.
            </p>
            <div className="gold-line my-8" />
          </FadeIn>

          <FadeIn delay={0.06}>
            <BookingForm />
          </FadeIn>
        </div>
      </section>

      {/* Payments */}
      <section id="payments" className="scroll-mt-24 border-t border-white/5 bg-noir-900/40 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <FadeIn>
            <div className="mb-3 flex items-center gap-3">
              <Mic2 className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold/90">
                Secure Your Booking
              </span>
            </div>
            <h2 className="font-serif text-3xl text-white md:text-4xl">Preferred settlement</h2>
            <p className="mt-3 text-sm text-zinc-500">
              Methods are confirmed after screening. Never send funds to unsolicited
              accounts.
            </p>
            <div className="gold-line my-8" />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-noir-850/50 p-8 text-center">
                <Bitcoin className="h-12 w-12 text-gold" strokeWidth={1.25} aria-hidden />
                <p className="mt-4 font-serif text-lg text-white">Bitcoin</p>
                <p className="mt-2 text-xs text-zinc-500">BTC on request</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-noir-850/50 p-8 text-center">
                <Layers className="h-12 w-12 text-gold" strokeWidth={1.25} aria-hidden />
                <p className="mt-4 font-serif text-lg text-white">Ethereum</p>
                <p className="mt-2 text-xs text-zinc-500">ETH on request</p>
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-noir-850/50 p-8 text-center">
                <Smartphone className="h-12 w-12 text-gold" strokeWidth={1.25} aria-hidden />
                <p className="mt-4 font-serif text-lg text-white">Cash App</p>
                <p className="mt-2 text-xs text-zinc-500">When approved</p>
              </div>
            </div>
            <p className="mt-8 rounded-xl border border-white/8 bg-noir-950/50 p-5 text-center text-sm text-zinc-400">
              <strong className="text-zinc-200">Verification deposits:</strong> In some
              cases, select <strong className="text-gold-light/90">digital gift-card</strong>{" "}
              paths (for example major retailer cards) may be offered{" "}
              <em>only</em> as part of an explicit, written verification process—never via
              pressure or surprise requests. Always confirm instructions through the same
              secure channel you used to book.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 pb-24 pt-12 md:pb-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl text-white md:text-4xl">Contact</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500">
              Prefer WhatsApp for a fast reply—email for longer introductions.
            </p>
            <div className="gold-line mx-auto my-8" />
            <div className="mx-auto mb-8 flex max-w-lg flex-col gap-3 text-left sm:flex-row sm:justify-center sm:gap-8">
              <a
                href={`tel:${SITE.phoneE164}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-noir-900/50 px-5 py-4 transition hover:border-gold/30"
              >
                <Phone className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Phone</p>
                  <p className="font-medium text-zinc-200">{SITE.phoneDisplay}</p>
                </div>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-noir-900/50 px-5 py-4 transition hover:border-gold/30"
              >
                <Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Email</p>
                  <p className="break-all font-medium text-zinc-200">{SITE.email}</p>
                </div>
              </a>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-emerald-300 transition hover:bg-emerald-500/20 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                WhatsApp
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-sky-300 transition hover:bg-sky-500/20 sm:w-auto"
              >
                <Send className="h-5 w-5" aria-hidden />
                Telegram
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null ? (
          <Lightbox
            key="gallery-lightbox"
            index={lightbox}
            total={n}
            onClose={() => setLightbox(null)}
            onPrev={() => goLightbox(-1)}
            onNext={() => goLightbox(1)}
          />
        ) : null}
      </AnimatePresence>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Leslie · New York. All rights reserved.</p>
        <p className="mt-2">
          <a href={`tel:${SITE.phoneE164}`} className="transition hover:text-gold">
            {SITE.phoneDisplay}
          </a>
          <span className="mx-2 text-zinc-700">·</span>
          <a href={`mailto:${SITE.email}`} className="transition hover:text-gold">
            {SITE.email}
          </a>
        </p>
        <p className="mt-2">21+ · By appointment only · Discreet correspondence</p>
      </footer>
    </main>
  );
}
