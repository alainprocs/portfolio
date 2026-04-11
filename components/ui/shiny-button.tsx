"use client"

import React from "react"

// Pure CSS shiny button — no framer-motion CSS variable issues.
// All instances share the same @keyframes so they stay perfectly in sync.

interface ShinyButtonProps {
  children: React.ReactNode
  href: string
  target?: string
  rel?: string
}

export function ShinyButton({ children, href, target, rel }: ShinyButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="shiny-btn"
      style={{ textDecoration: "none" }}
    >
      <span className="shiny-btn__text">{children}</span>
      <span className="shiny-btn__border" />
    </a>
  )
}
