"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const [tilt, setTilt] = useState(0)

  return (
    <motion.div
      // Outer card: no scale zoom — only slight tilt on mobile touch
      animate={{ rotate: tilt }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      onTouchStart={() => setTilt(2)}
      onTouchEnd={() => setTilt(0)}
      onTouchCancel={() => setTilt(0)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        border: "1px solid rgba(180,180,200,0.13)",
        margin: "0 6px",
      }}
    >
      <Link
        href={item.url}
        target={item.url.startsWith("http") ? "_blank" : undefined}
        rel={item.url.startsWith("http") ? "noopener" : undefined}
        style={{ display: "block", textDecoration: "none" }}
      >
        {/* Image only zooms on hover — undercard stays static */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ position: "relative", aspectRatio: "3/4" }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </motion.div>

        {/* Text undercard — white background, fixed 25% height, stays unzoomed */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "25%",
            padding: "10px 12px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <div style={{
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 700,
            lineHeight: 1,
          }}>
            {item.accent ?? "Project"}
          </div>
          <div style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#0f0f1a",
            lineHeight: 1.25,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}>
            {item.title}
          </div>
          <div style={{
            fontSize: "0.65rem",
            color: "rgba(0,0,0,0.6)",
            lineHeight: 1.4,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
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
  const doubled = [...items, ...items]

  return (
    <div
      style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // On touch devices: pause only while finger is held down, resume on lift
      onTouchStart={(e) => {
        // Only pause if it's a sustained hold, not a tap-to-navigate
        e.currentTarget.dataset.holdTimer = String(
          window.setTimeout(() => setPaused(true), 150)
        )
      }}
      onTouchEnd={(e) => {
        clearTimeout(Number(e.currentTarget.dataset.holdTimer))
        setPaused(false)
      }}
      onTouchCancel={(e) => {
        clearTimeout(Number(e.currentTarget.dataset.holdTimer))
        setPaused(false)
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
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
  subheading,
}: {
  items: CarouselItem[]
  accentColor?: string
  heading?: string
  subheading?: string
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], isDesktop ? [55, 0] : [30, 0])
  const scale   = useTransform(scrollYProgress, [0, 1], [0.9, 1])

  return (
    <section
      ref={sectionRef}
      style={{ padding: `${isDesktop ? "clamp(40px,8vw,80px)" : "16px"} 0 clamp(50px,10vw,100px)` }}
    >
      <div style={{ width: isDesktop ? "72%" : "90%", margin: "0 auto" }}>

        {/* Header */}
        {heading && (
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <div style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: accentColor,
              marginBottom: 12,
            }}>
              Featured work
            </div>
            <h3 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 14px",
            }}>
              {heading}
            </h3>
            {subheading && (
              <p style={{
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 540,
                marginInline: "auto",
              }}>
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* perspective must live on the PARENT for rotateX to look 3D */}
        <div
          style={{
            perspective: isDesktop ? "1200px" : "600px",
            perspectiveOrigin: "center top",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              gap: 20,
              height: isDesktop ? "calc(0.96 * 72vw - 7px)" : "clamp(480px, 70vh, 680px)",
              overflow: "hidden",
              rotateX,
              scale,
              transformOrigin: "50% 0%",
              transformStyle: isDesktop ? "preserve-3d" : "flat",
              willChange: "transform",
            }}
          >
            {distribute(items, 3).map((col, i) => (
              <GalleryColumn
                key={i}
                items={col}
                direction={i === 1 ? "down" : "up"}
                duration={[49, 58, 41][i]}
                accentColor={accentColor}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
