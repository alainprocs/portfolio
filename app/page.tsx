"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// ── Types ──────────────────────────────────────────────────────
interface NavLink { label: string; href: string; }
interface ProjectCard { label: string; title: string; desc: React.ReactNode; img: string; link?: string; }
interface SiteCard { label: string; title: string; desc: string; img: string; href: string; }

// ── Data ───────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "My Projects", href: "#projects" },
  { label: "My Websites", href: "#websites" },
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
  return (
    <>
      {/* ── FIXED full-page particle layer ────────────────────
          position:fixed so it covers the viewport at all scroll depths.
          pointer-events:none so clicks pass through to content.       */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundColor: "#06060a",
        }}
      >
        <SparklesCore
          id="global-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1.2}
          particleDensity={55}
          particleColor="#ffffff"
          speed={0.5}
          className="w-full h-full"
        />
      </div>

      {/* ── All scrollable content sits above the particle layer ── */}
      <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

        {/* HERO */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16" style={{ minHeight: "560px" }}>
          <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)" }}
            >
              Hi, I&apos;m{" "}
              <span
                className="animate-gradient-x"
                style={{
                  background: "linear-gradient(90deg, #05ddfa, #8c31e8, #05ddfa)",
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Alain Procs.
              </span>
            </motion.h1>

            {/* Beam + dense sparkle burst below the name */}
            <div className="relative w-72 h-8 sm:w-96">
              <div className="absolute inset-x-8 top-0 h-px w-5/6 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
              <div className="absolute inset-x-8 top-0 h-px w-5/6 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="absolute inset-x-20 top-0 h-[3px] w-3/5 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
              <div className="absolute inset-x-20 top-0 h-px w-3/5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={800}
                particleColor="#ffffff"
                className="w-full h-full"
              />
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: "#06060a",
                  maskImage: "radial-gradient(260px 60px at top, transparent 20%, white)",
                  WebkitMaskImage: "radial-gradient(260px 60px at top, transparent 20%, white)",
                }}
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              <p className="text-base sm:text-lg font-light" style={{ color: "#9e9baf" }}>
                (The) Go-To-Market Engineer{" "}
                <strong className="font-semibold text-white">you&apos;re looking for.</strong>
              </p>
              <p className="text-sm mt-1" style={{ color: "#9e9baf" }}>
                I&apos;ve built production-grade GTM automations that replace a whole marketing team.
              </p>
            </motion.div>

            {/* Pills */}
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="flex flex-wrap justify-center gap-2.5 mt-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85"
                  style={pillStyle(link.label)}
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-6 pb-24 space-y-20">

          <section id="projects" className="pt-16">
            <SectionTitle>My Projects</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {projects.map((p, i) => <ProjectCardEl key={p.title} p={p} i={i} />)}
            </div>
          </section>

          <section id="websites">
            <SectionTitle>My Websites</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sites.map((s, i) => <SiteCardEl key={s.title} s={s} i={i} />)}
            </div>
          </section>

          <footer className="pt-10 border-t flex flex-col items-center gap-5 text-center" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p className="text-sm" style={{ color: "#9e9baf" }}>
              Got any questions? Interested in a custom project?<br />
              Don&apos;t hesitate to <strong className="text-white">contact me!</strong>
            </p>
            <a
              href="https://www.linkedin.com/in/aprocc/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{ background: "#0a66c2" }}
            >
              Connect on LinkedIn
            </a>
            <p className="text-xs" style={{ color: "#444" }}>Made with ♥ — Alain Procs</p>
          </footer>
        </div>
      </main>
    </>
  );
}
