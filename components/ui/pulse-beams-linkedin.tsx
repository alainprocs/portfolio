"use client"

import React from "react"
import { motion } from "framer-motion"

// Beam paths converge on center (429, 160) from sides/corners
const BEAMS = [
  // Left side — straight in
  {
    path: "M 0 160 L 429 160",
    gradient: {
      initial:  { x1: "0%",   x2: "0%",   y1: "0%", y2: "0%" },
      animate:  { x1: ["0%",  "100%"], x2: ["20%", "120%"], y1: "0%", y2: "0%" },
      transition: { duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 0.8 },
    },
  },
  // Right side — straight in
  {
    path: "M 858 160 L 429 160",
    gradient: {
      initial:  { x1: "100%", x2: "100%", y1: "0%", y2: "0%" },
      animate:  { x1: ["100%", "0%"], x2: ["80%", "-20%"], y1: "0%", y2: "0%" },
      transition: { duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 0.8, delay: 0.4 },
    },
  },
  // Top-left corner — curved
  {
    path: "M 0 0 C 100 0 200 80 429 160",
    gradient: {
      initial:  { x1: "0%",  x2: "0%",  y1: "0%",   y2: "0%" },
      animate:  { x1: ["0%",  "80%"], x2: ["20%", "100%"], y1: ["0%", "80%"], y2: ["20%", "100%"] },
      transition: { duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1, delay: 0.2 },
    },
  },
  // Top-right corner — curved
  {
    path: "M 858 0 C 758 0 658 80 429 160",
    gradient: {
      initial:  { x1: "100%", x2: "100%", y1: "0%",   y2: "0%" },
      animate:  { x1: ["100%", "20%"], x2: ["80%", "0%"], y1: ["0%", "80%"], y2: ["20%", "100%"] },
      transition: { duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1, delay: 0.6 },
    },
  },
  // Bottom-left corner — curved
  {
    path: "M 0 320 C 100 320 200 240 429 160",
    gradient: {
      initial:  { x1: "0%",  x2: "0%",  y1: "100%",  y2: "100%" },
      animate:  { x1: ["0%",  "80%"], x2: ["20%", "100%"], y1: ["100%", "20%"], y2: ["80%", "0%"] },
      transition: { duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1, delay: 1.0 },
    },
  },
  // Bottom-right corner — curved
  {
    path: "M 858 320 C 758 320 658 240 429 160",
    gradient: {
      initial:  { x1: "100%", x2: "100%", y1: "100%",  y2: "100%" },
      animate:  { x1: ["100%", "20%"], x2: ["80%", "0%"], y1: ["100%", "20%"], y2: ["80%", "0%"] },
      transition: { duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1, delay: 1.4 },
    },
  },
]

const BASE_COLOR  = "rgba(255,255,255,0.06)"
const GLOW_COLOR  = "rgba(10,102,194,0.55)"   // LinkedIn blue glow

export function PulseBeamsLinkedIn() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "60px 0",
      }}
    >
      {/* SVG beams layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <svg
          width="858"
          height="320"
          viewBox="0 0 858 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: "100%" }}
        >
          {/* Static base lines */}
          {BEAMS.map((beam, i) => (
            <path key={`base-${i}`} d={beam.path} stroke={BASE_COLOR} strokeWidth="1" />
          ))}

          {/* Animated gradient pulses */}
          {BEAMS.map((beam, i) => (
            <path
              key={`glow-${i}`}
              d={beam.path}
              stroke={`url(#grad${i})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}

          {/* Connection dot at center */}
          <circle cx="429" cy="160" r="4" fill="#0a66c2" opacity="0.8" />
          <circle cx="429" cy="160" r="8" fill="none" stroke="#0a66c2" strokeWidth="1" opacity="0.3" />

          <defs>
            {BEAMS.map((beam, i) => (
              <motion.linearGradient
                key={i}
                id={`grad${i}`}
                gradientUnits="userSpaceOnUse"
                initial={beam.gradient.initial}
                animate={beam.gradient.animate}
                // @ts-ignore framer-motion linearGradient transition
                transition={beam.gradient.transition}
              >
                <stop offset="0%"   stopColor="#18CCFC" stopOpacity="0" />
                <stop offset="30%"  stopColor="#0a66c2" stopOpacity="1" />
                <stop offset="70%"  stopColor="#6344F5" stopOpacity="1" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      {/* Center button */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 24px" }}>
        <p style={{ fontSize: "0.75rem", color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, margin: 0, textAlign: "center", maxWidth: 280 }}>
          Got questions? Interested in a custom project?
        </p>
        <a
          href="https://www.linkedin.com/in/aprocc/"
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 32px",
            borderRadius: 9999,
            background: "#0a66c2",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
            boxShadow: `0 0 32px ${GLOW_COLOR}, 0 0 64px rgba(10,102,194,0.2)`,
            transition: "transform 0.2s, box-shadow 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = "translateY(-2px)"
            el.style.boxShadow = `0 0 48px ${GLOW_COLOR}, 0 0 96px rgba(10,102,194,0.3)`
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = "translateY(0)"
            el.style.boxShadow = `0 0 32px ${GLOW_COLOR}, 0 0 64px rgba(10,102,194,0.2)`
          }}
        >
          {/* LinkedIn icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Connect on LinkedIn
        </a>
        <p style={{ fontSize: "0.75rem", color: "#fff", margin: 0 }}>Made with ♥ — Alain Procs</p>
      </div>
    </div>
  )
}
