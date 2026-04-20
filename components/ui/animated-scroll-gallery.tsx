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
function GalleryCard({
  item,
  accentColor,
  isExpanded,
  onExpand,
  onCollapse,
}: {
  item: CarouselItem
  accentColor: string
  isExpanded: boolean
  onExpand: () => void
  onCollapse: () => void
}) {
  const [tilt, setTilt] = useState(0)
  const [imgError, setImgError] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    // Only intercept on touch/mobile (hover: none means no mouse hover capability)
    if (!window.matchMedia("(hover: none)").matches) return
    if (!isExpanded) {
      e.preventDefault()
      onExpand()
    }
    // If already expanded: let Link navigate naturally, then collapse
    if (isExpanded) onCollapse()
  }

  return (
    <motion.div
      animate={{ rotate: isExpanded ? 0 : tilt }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      onTouchStart={() => { if (!isExpanded) setTilt(2) }}
      onTouchEnd={() => setTilt(0)}
      onTouchCancel={() => setTilt(0)}
      onClick={(e) => e.stopPropagation()} // prevent column's collapse-on-outside-click
      style={{
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        border: isExpanded
          ? `1px solid ${accentColor}55`
          : "1px solid rgba(180,180,200,0.13)",
        margin: "0 6px",
        transition: "border-color 0.2s",
      }}
    >
      <Link
        href={item.url}
        target={item.url.startsWith("http") ? "_blank" : undefined}
        rel={item.url.startsWith("http") ? "noopener" : undefined}
        style={{ display: "block", textDecoration: "none" }}
        onClick={handleClick}
      >
        {/* Image — zooms on hover, gradient fallback if no screenshot yet */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ position: "relative", aspectRatio: "3/4" }}
        >
          {imgError ? (
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 30% 30%, ${accentColor}55 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, ${accentColor}28 0%, transparent 55%), #0a0a14`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em",
                background: `linear-gradient(90deg, ${accentColor}, #a78bfa)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {item.title}
              </span>
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          )}
          {/* dark gradient blending into undercard */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(4,4,12,0.85) 100%)",
            pointerEvents: "none",
          }} />
        </motion.div>

        {/* Text undercard — dark glass */}
        <motion.div
          animate={{ height: isExpanded ? "56%" : "28%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            padding: "12px 14px",
            background: "rgba(6, 5, 18, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: `1px solid ${accentColor}28`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            overflow: "hidden",
          }}
        >
          <div style={{
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 700,
            lineHeight: 1,
          }}>
            {item.accent ?? "Project"}
          </div>
          <div style={{
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.25,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}>
            {item.title}
          </div>
          <div style={{
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.45,
            overflow: "hidden",
            display: isExpanded ? "block" : "-webkit-box",
            WebkitLineClamp: isExpanded ? undefined : 2,
            WebkitBoxOrient: isExpanded ? undefined : "vertical",
          }}>
            {item.summary}
          </div>

          {/* Arrow hint — only visible when expanded */}
          {isExpanded && (
            <div style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: accentColor,
            }}>
              Tap again to open
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ── Single column — auto-scrolling, pauses on hover / card expanded ───────────
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
  const [hoverPaused, setHoverPaused] = useState(false)
  const [expandedKey, setExpandedKey] = useState<string | null>(null)
  const doubled = [...items, ...items]

  const isPaused = hoverPaused || expandedKey !== null

  return (
    <div
      style={{ flex: 1, minWidth: 0, overflow: "hidden" }}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => { setHoverPaused(false); setExpandedKey(null) }}
      // Tap outside a card collapses any expanded card
      onClick={() => setExpandedKey(null)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          animation: `gallery-scroll-${direction} ${duration}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => {
          const key = `${item.id}-${i}`
          return (
            <GalleryCard
              key={key}
              item={item}
              accentColor={accentColor}
              isExpanded={expandedKey === key}
              onExpand={() => setExpandedKey(key)}
              onCollapse={() => setExpandedKey(null)}
            />
          )
        })}
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
