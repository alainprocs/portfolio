"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { CarouselItem } from "./gallery-hover-carousel"

// ── Distribute items across N columns, guaranteeing min items per col ──────
function distribute(items: CarouselItem[], cols = 3, minPerCol = 5): CarouselItem[][] {
  const result: CarouselItem[][] = Array.from({ length: cols }, () => [])
  const total = Math.max(items.length, cols * minPerCol)
  for (let i = 0; i < total; i++) {
    result[i % cols].push(items[i % items.length])
  }
  return result
}

// ── Single card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, accentColor }: { item: CarouselItem; accentColor: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ borderRadius: 14, overflow: "hidden", position: "relative", flexShrink: 0 }}
    >
      <Link
        href={item.url}
        target={item.url.startsWith("http") ? "_blank" : undefined}
        rel={item.url.startsWith("http") ? "noopener" : undefined}
        style={{ display: "block", textDecoration: "none" }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "3/4" }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </div>

        {/* Text undercard */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            padding: "20px 14px 14px",
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 65%, transparent 100%)",
          }}
        >
          <div style={{
            fontSize: "0.58rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 700,
            marginBottom: 4,
          }}>
            {item.accent ?? "Project"}
          </div>
          <div style={{
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
          }}>
            {item.title}
          </div>
          <div style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.48)",
            marginTop: 4,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {item.summary}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Single column — auto-scrolling, pauses on hover ──────────────────────────
function GalleryColumn({
  items,
  direction,
  duration,
  accentColor,
}: {
  items: CarouselItem[]
  direction: "up" | "down"
  duration: number
  accentColor: string
}) {
  const [paused, setPaused] = useState(false)
  // Double items for seamless CSS loop
  const doubled = [...items, ...items]

  return (
    <div
      style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          animation: `gallery-scroll-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <GalleryCard key={`${item.id}-${i}`} item={item} accentColor={accentColor} />
        ))}
      </div>
    </div>
  )
}

// ── Public component ─────────────────────────────────────────────────────────
export function AnimatedScrollGallery({
  items,
  accentColor = "#05ddfa",
  heading,
}: {
  items: CarouselItem[]
  accentColor?: string
  heading?: string
}) {
  const [col1, col2, col3] = distribute(items)

  return (
    <section style={{ padding: "clamp(40px,8vw,80px) 0 clamp(50px,10vw,100px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)" }}>

        {/* Header */}
        {heading && (
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: accentColor,
              marginBottom: 10,
            }}>
              Featured work
            </div>
            <h3 style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.2,
              margin: 0,
            }}>
              {heading}
            </h3>
          </div>
        )}

        {/* 3-column gallery — left & right scroll up, middle scrolls down */}
        <div style={{ display: "flex", gap: 10, height: "clamp(480px, 70vh, 680px)", overflow: "hidden" }}>
          <GalleryColumn items={col1} direction="up"   duration={28} accentColor={accentColor} />
          <GalleryColumn items={col2} direction="down" duration={34} accentColor={accentColor} />
          <GalleryColumn items={col3} direction="up"   duration={24} accentColor={accentColor} />
        </div>
      </div>
    </section>
  )
}
