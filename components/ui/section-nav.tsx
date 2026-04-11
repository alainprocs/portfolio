"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const TABS = [
  { id: "projects",  label: "Automations",      short: "Automations" },
  { id: "websites",  label: "Websites Managed",  short: "Websites" },
  { id: "ui-demos",  label: "UI Demos",           short: "UI Demos" },
]

const CYAN   = "#05ddfa"
const PURPLE = "#8c31e8"

interface SectionNavProps {
  active: string | null
  onSelect: (id: string) => void
}

export function SectionNav({ active, onSelect }: SectionNavProps) {
  const [hovered, setHovered]   = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 480)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: 6,
        borderRadius: 9999,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {TABS.map((tab) => {
        const isActive  = active  === tab.id
        const isHovered = hovered === tab.id && !isActive
        const displayLabel = isMobile ? tab.short : tab.label

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              padding: isMobile ? "9px 13px" : "10px 18px",
              borderRadius: 9999,
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: isMobile ? "0.78rem" : "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: isActive
                ? "#fff"
                : isHovered
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.4)",
              transition: "color 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {/* ── Sliding active pill ─────────────────────────── */}
            {isActive && (
              <motion.span
                layoutId="cosmic-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 9999,
                  background: `linear-gradient(135deg, ${CYAN}22 0%, ${PURPLE}22 100%)`,
                  boxShadow: `
                    0 0 18px ${CYAN}33,
                    0 0 40px ${PURPLE}22,
                    inset 0 1px 0 rgba(255,255,255,0.12),
                    inset 0 0 20px ${CYAN}11
                  `,
                }}
              >
                <span
                  className="nav-border-spin"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    padding: 1,
                    background: `linear-gradient(135deg, ${CYAN}, ${PURPLE}, ${CYAN})`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </motion.span>
            )}

            {/* ── Hover glow (inactive tabs) ──────────────────── */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  key="hover-glow"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.055)",
                    boxShadow: `0 0 14px ${CYAN}22, 0 0 28px ${PURPLE}18`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* ── Label ───────────────────────────────────────── */}
            <span style={{ position: "relative", zIndex: 1 }}>
              {isActive
                ? <span style={{
                    background: `linear-gradient(90deg, ${CYAN}, #a78bfa)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: `drop-shadow(0 0 8px ${CYAN}88)`,
                    fontWeight: 600,
                  }}>
                    {displayLabel}
                  </span>
                : displayLabel
              }
            </span>
          </button>
        )
      })}
    </div>
  )
}
