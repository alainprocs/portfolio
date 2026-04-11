"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { ShaderIntro } from "@/components/ui/shader-intro";
import { SectionNav } from "@/components/ui/section-nav";
import { AnimatedScrollGallery } from "@/components/ui/animated-scroll-gallery";
import type { CarouselItem } from "@/components/ui/gallery-hover-carousel";
import { PulseBeamsLinkedIn } from "@/components/ui/pulse-beams-linkedin";
import { ShinyButton } from "@/components/ui/shiny-button";
import { AnimatedShaderCanvas } from "@/components/ui/animated-shader-hero";
import Image from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// ── Types ──────────────────────────────────────────────────────
interface NavLink { label: string; href: string; }
interface ProjectCard { label: string; title: string; desc: React.ReactNode; img: string; link?: string; }
interface SiteCard { label: string; title: string; desc: string; img: string; href: string; }
interface DemoCard { title: string; tagline: string; desc: string; href: string; accent: string; date: string; }

// ── Data ───────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Book a Meeting", href: "https://calendly.com/alainprocs/30min?month=2025-06&date=2025-06-30" },
  { label: "My Resume", href: "https://drive.google.com/file/d/1ePYhYN9EIaxsli4Tci6637dHjiwGRI3p/view?usp=sharing" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aprocc/" },
  { label: "Email", href: "mailto:alainprocs@gmail.com" },
];

const projects: ProjectCard[] = [
  {
    label: "MCP Servers", title: "Blog Maker",
    desc: <>The workflow that replaced a whole <strong className="text-white">marketing</strong> team.</>,
    img: `${BASE}/assets/images/image09.jpg`,
    link: "https://docs.google.com/document/d/1LWYgGZ1ID7iTryUfHZZiTDCeZj82jr-HN8YyN_3zVB8/edit?usp=sharing",
  },
  {
    label: "Make.com", title: "Amazon Affiliate Marketing Automation",
    desc: <>Everything you need to get started in the Affiliate Marketing Business, <strong className="text-white">like a pro.</strong></>,
    img: `${BASE}/assets/images/image03.jpg`,
    link: "https://docs.google.com/document/d/1kEeNU1sZlCZaNWjNstUrdioDwuEVdCjTDBnRyAZxz7Y/edit?usp=sharing",
  },
  {
    label: "n8n", title: "EZ Reddit Lead Gen",
    desc: <>This is how to become big on <strong className="text-white">Reddit</strong> and get more <strong className="text-white">leads</strong> into your <strong className="text-white">business.</strong></>,
    img: `${BASE}/assets/images/image06.jpg`,
    link: "https://docs.google.com/document/d/1AG_24DJfGigWgUY4iughagytECXVqBQtBoOPWKFLkuM/edit?usp=sharing",
  },
  {
    label: "n8n", title: "AI-Powered Lead Enrichment Researcher",
    desc: <>Find <strong className="text-white">everything you need to know</strong> about your leads, with the power of <strong className="text-white">Perplexity.</strong></>,
    img: `${BASE}/assets/images/image08.jpg`,
    link: "https://docs.google.com/document/d/1l5EFwZW8I1y58f674hO7Cmf-xXmE2OSNA4N960L633k/edit?usp=sharing",
  },
  {
    label: "n8n", title: "The Client Satisfaction Early Warning System",
    desc: <>An automated BI workflow that <strong className="text-white">proactively monitors</strong> client sentiment and sends dissatisfaction alerts before clients churn.</>,
    img: `${BASE}/assets/images/image04.jpg`,
  },
];

const sites: SiteCard[] = [
  { label: "WordPress", title: "Eightx", desc: "eightx.co", img: `${BASE}/assets/images/image07.jpg`, href: "https://eightx.co/" },
  { label: "WordPress", title: "TranquiWick", desc: "tranquilwick.com", img: `${BASE}/assets/images/image02.jpg`, href: "https://tranquilwick.com/" },
  { label: "Website", title: "Mushy Recipe", desc: "mushyrecipe.com", img: `${BASE}/assets/images/mushy.jpg`, href: "https://mushyrecipe.com/" },
  { label: "Website", title: "WC Shipping", desc: "wcshipping.com", img: `${BASE}/assets/images/wcshipping.jpg`, href: "https://wcshipping.com/" },
  { label: "Website", title: "Novo Labs", desc: "novolabs.xyz", img: `${BASE}/assets/images/novolabs.jpg`, href: "https://novolabs.xyz/" },
];

const automationItems: CarouselItem[] = [
  { id: "1", title: "Blog Maker", accent: "MCP Servers", summary: "The workflow that replaced a whole marketing team. End-to-end content pipeline powered by AI.", url: "https://docs.google.com/document/d/1LWYgGZ1ID7iTryUfHZZiTDCeZj82jr-HN8YyN_3zVB8/edit?usp=sharing", image: `${BASE}/assets/images/image09.jpg` },
  { id: "2", title: "Amazon Affiliate Automation", accent: "Make.com", summary: "Everything you need to get started in the Affiliate Marketing business, like a pro.", url: "https://docs.google.com/document/d/1kEeNU1sZlCZaNWjNstUrdioDwuEVdCjTDBnRyAZxz7Y/edit?usp=sharing", image: `${BASE}/assets/images/image03.jpg` },
  { id: "3", title: "EZ Reddit Lead Gen", accent: "n8n", summary: "How to become big on Reddit and get more leads into your business, automated.", url: "https://docs.google.com/document/d/1AG_24DJfGigWgUY4iughagytECXVqBQtBoOPWKFLkuM/edit?usp=sharing", image: `${BASE}/assets/images/image06.jpg` },
  { id: "4", title: "AI-Powered Lead Enrichment", accent: "n8n + Perplexity", summary: "Find everything you need to know about your leads with the power of Perplexity AI.", url: "https://docs.google.com/document/d/1l5EFwZW8I1y58f674hO7Cmf-xXmE2OSNA4N960L633k/edit?usp=sharing", image: `${BASE}/assets/images/image08.jpg` },
  { id: "5", title: "Client Satisfaction Early Warning", accent: "n8n", summary: "Automated BI workflow that proactively monitors client sentiment and sends dissatisfaction alerts.", url: "#", image: `${BASE}/assets/images/image04.jpg` },
];

const websiteItems: CarouselItem[] = [
  { id: "1", title: "Eightx", accent: "WordPress", summary: "Full-stack growth consultancy site with custom CRO optimisations.", url: "https://eightx.co/", image: `${BASE}/assets/images/image07.jpg` },
  { id: "2", title: "TranquiWick", accent: "WordPress", summary: "Luxury candle brand e-commerce with scent personalisation flow.", url: "https://tranquilwick.com/", image: `${BASE}/assets/images/image02.jpg` },
  { id: "3", title: "Mushy Recipe", accent: "Website", summary: "Recipe discovery platform with AI-generated meal plans.", url: "https://mushyrecipe.com/", image: `${BASE}/assets/images/mushy.jpg` },
  { id: "4", title: "WC Shipping", accent: "Website", summary: "Global freight logistics platform with real-time rate calculation.", url: "https://wcshipping.com/", image: `${BASE}/assets/images/wcshipping.jpg` },
  { id: "5", title: "Novo Labs", accent: "Website", summary: "AI-native product studio — branding, design and development.", url: "https://novolabs.xyz/", image: `${BASE}/assets/images/novolabs.jpg` },
];

const demoItems: CarouselItem[] = [
  { id: "1", title: "Driftwave", accent: "Apr 10 2026", summary: "Async video collaboration SaaS — dark cyan/violet glassmorphism with floating blob animations.", url: "https://alainprocs.github.io/ui-demos/driftwave", image: `${BASE}/assets/images/driftwave.jpg` },
  { id: "2", title: "Orbita", accent: "Apr 12 2026", summary: "Infrastructure cost intelligence SaaS — black/amber industrial with circuit grid and magnetic buttons.", url: "https://alainprocs.github.io/ui-demos/orbita", image: `${BASE}/assets/images/orbita.jpg` },
];

const demos: DemoCard[] = [
  { title: "Driftwave", tagline: "Async Video Collaboration", desc: "Replace endless meetings with rich async video threads built for remote design teams.", href: "https://alainprocs.github.io/ui-demos/driftwave", accent: "#06b6d4", date: "Apr 10, 2026" },
  { title: "Orbita", tagline: "Infrastructure Cost Intelligence", desc: "AI-powered cloud cost optimization that eliminates waste automatically. Zero config, instant savings.", href: "https://alainprocs.github.io/ui-demos/orbita", accent: "#f59e0b", date: "Apr 12, 2026" },
];

// ── Helpers ────────────────────────────────────────────────────
function pillStyle(label: string): React.CSSProperties {
  if (label === "My Projects") return { background: "#5b63d6" };
  if (label === "My Websites") return { background: "#2d9ca8" };
  if (label === "Book a Meeting") return { background: "#8c31e8" };
  if (label === "LinkedIn") return { background: "#0a66c2" };
  return { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" };
}

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

// ── Project card ───────────────────────────────────────────────
function ProjectCardEl({ p, i }: { p: ProjectCard; i: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      className="flex flex-col rounded-2xl overflow-hidden h-full cursor-pointer"
      style={{ background: "rgba(15,15,20,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)", transition: "box-shadow 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 40px rgba(255,255,255,0.06)"; el.style.borderColor = "rgba(255,255,255,0.18)"; }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image src={p.img} alt={p.title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 p-5 flex-1">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#05ddfa" }}>{p.label}</span>
        <p className="font-semibold leading-snug text-white">{p.title}</p>
        <p className="text-sm leading-relaxed" style={{ color: "#9e9baf" }}>{p.desc}</p>
        {p.link && (
          <span className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#05ddfa" }}>
            View Project <Arrow />
          </span>
        )}
      </div>
    </motion.div>
  );
  return p.link
    ? <a href={p.link} target="_blank" rel="noopener" className="flex flex-col no-underline">{inner}</a>
    : <div className="flex flex-col">{inner}</div>;
}

// ── Site card ──────────────────────────────────────────────────
function SiteCardEl({ s, i }: { s: SiteCard; i: number }) {
  return (
    <a href={s.href} target="_blank" rel="noopener" className="no-underline">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.08 }}
        whileHover={{ y: -6 }}
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "rgba(15,15,20,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)", transition: "box-shadow 0.2s, border-color 0.2s" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 40px rgba(140,49,232,0.16)"; el.style.borderColor = "rgba(140,49,232,0.35)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image src={s.img} alt={s.title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2 p-5">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8c31e8" }}>{s.label}</span>
          <p className="font-semibold text-white">{s.title}</p>
          <p className="text-sm" style={{ color: "#9e9baf" }}>{s.desc}</p>
          <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#8c31e8" }}>
            Visit Site <Arrow />
          </span>
        </div>
      </motion.div>
    </a>
  );
}

// ── Demo card ──────────────────────────────────────────────────
function DemoCardEl({ d, i }: { d: DemoCard; i: number }) {
  return (
    <a href={d.href} target="_blank" rel="noopener" className="no-underline">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.08 }}
        whileHover={{ y: -6 }}
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "rgba(15,15,20,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)", transition: "box-shadow 0.2s, border-color 0.2s" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = `0 12px 40px ${d.accent}28`; el.style.borderColor = `${d.accent}55`; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
      >
        <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "16/9", background: `radial-gradient(ellipse at 30% 40%, ${d.accent}38, transparent 60%), radial-gradient(ellipse at 75% 70%, ${d.accent}18, transparent 50%), #0f1117` }}>
          <span className="font-bold tracking-tight" style={{ fontSize: "1.6rem", background: `linear-gradient(90deg, ${d.accent}, #a78bfa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{d.title}</span>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: d.accent }}>Daily Build · {d.date}</span>
          <p className="font-semibold text-white">{d.tagline}</p>
          <p className="text-sm" style={{ color: "#9e9baf" }}>{d.desc}</p>
          <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold" style={{ color: d.accent }}>
            Visit Site <Arrow />
          </span>
        </div>
      </motion.div>
    </a>
  );
}

// ── Section title ──────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 whitespace-nowrap">
        <span style={{ color: "#05ddfa" }}>◈</span> {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("projects");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSectionSelect = (id: string) => {
    setActiveSection(id);
    // Give React one frame to render the section, then scroll to it
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      {/* ── Shader intro overlay ──────────────────────────────── */}
      <ShaderIntro onDone={() => setIntroComplete(true)} />

      {/* ── Full-page particle background at z-index 0 ───────────
          The hero's WebGL canvas (absolute, inside hero section) naturally
          covers these particles in the hero area. Below the hero they
          show through on the dark background — no cutoff.              */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundColor: "#06060a" }}>
        <SparklesCore
          id="global-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1.1}
          particleDensity={50}
          particleColor="#ffffff"
          speed={0.45}
          className="w-full h-full"
        />
      </div>

      {/* ── All scrollable content ─────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}
      >

        {/* ── HERO — shader background + content overlay ─────── */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#06060a", // opaque — shader canvas covers global particles here
          }}
        >
          {/* WebGL shader canvas */}
          <AnimatedShaderCanvas />

          {/* Sparkles layer — sits on top of canvas so particles are visible in the hero too */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <SparklesCore
              background="transparent"
              minSize={0.3}
              maxSize={1.1}
              particleDensity={50}
              particleColor="#ffffff"
              speed={0.45}
              className="w-full h-full"
            />
          </div>

          {/* Content overlay */}
          <div
            className="relative z-10 flex flex-col items-center text-center gap-5 px-6"
            style={{ maxWidth: 640 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#05ddfa",
              }}
            >
              ⚡ Production-grade GTM Automations
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 9vw, 6.5rem)" }}
            >
              Hi, I&apos;m{" "}
              <span
                className="animate-gradient-x"
                style={{
                  background: "linear-gradient(90deg, #e2e8f0, #a5b4fc, #e2e8f0)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Alain Procs.
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              <p className="text-base sm:text-lg font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
                (The) Go-To-Market Engineer{" "}
                <strong className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>you&apos;re looking for.</strong>
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                I&apos;ve built production-grade GTM automations that replace a whole marketing team.
              </p>
            </motion.div>

            {/* Shiny buttons */}
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="flex flex-wrap justify-center gap-2.5"
            >
              {navLinks.map((link) => (
                <ShinyButton
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                >
                  {link.label}
                </ShinyButton>
              ))}
            </motion.nav>

            {/* Section nav toggle bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46 }}
              className="mt-2"
            >
              <SectionNav active={activeSection} onSelect={handleSectionSelect} />
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        {/* Scroll anchor — clicking a pill scrolls here */}
        <div ref={contentRef} style={{ scrollMarginTop: 0 }} />

        <AnimatePresence mode="wait">
          {activeSection === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
            >
              <AnimatedScrollGallery
                heading="Production-grade GTM automations"
                items={automationItems}
                accentColor="#05ddfa"
              />
            </motion.div>
          )}

          {activeSection === "websites" && (
            <motion.div
              key="websites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
            >
              <AnimatedScrollGallery
                heading="Live sites I've built and managed"
                items={websiteItems}
                accentColor="#8c31e8"
              />
            </motion.div>
          )}

          {activeSection === "ui-demos" && (
            <motion.div
              key="ui-demos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
            >
              <AnimatedScrollGallery
                heading="Daily UI showcase builds"
                items={demoItems}
                accentColor="#f59e0b"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <PulseBeamsLinkedIn />
        </footer>
      </motion.main>
    </>
  );
}
