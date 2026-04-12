"use client"
import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  opacityDir: number
  opacitySpeed: number
}

/**
 * Lightweight canvas particle system — no library, 30 fps cap, GPU-composited.
 * Drop-in visual replacement for @tsparticles SparklesCore.
 */
export function MiniSparkles({
  particleColor = "#ffffff",
  particleDensity = 50,
  speed = 0.45,
  className = "",
}: {
  particleColor?: string
  particleDensity?: number
  speed?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId: number
    let lastTime = 0
    const FRAME_MS = 1000 / 30 // cap at 30 fps — imperceptible for slow-drifting particles
    let particles: Particle[] = []

    const seed = () => {
      const w = canvas.width
      const h = canvas.height
      // Scale count to canvas area; particleDensity is "particles per 400×400 block"
      const count = Math.max(8, Math.round((w * h) / (400 * 400) * particleDensity * 0.55))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.3 + Math.random() * 0.8,
        opacity: Math.random(),
        vx: (Math.random() - 0.5) * speed * 0.18,
        vy: -(0.05 + Math.random() * 0.5) * speed * 0.25,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        opacitySpeed: 0.003 + Math.random() * 0.007,
      }))
    }

    const resize = () => {
      canvas.width  = canvas.clientWidth  * Math.min(window.devicePixelRatio, 2)
      canvas.height = canvas.clientHeight * Math.min(window.devicePixelRatio, 2)
      seed()
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const render = (time: number) => {
      rafId = requestAnimationFrame(render)
      if (time - lastTime < FRAME_MS) return
      lastTime = time

      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = particleColor

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        // Wrap edges
        if (p.x < -2) p.x = w + 2
        if (p.x > w + 2) p.x = -2
        if (p.y < -2) p.y = h + 2

        // Twinkle
        p.opacity += p.opacityDir * p.opacitySpeed
        if (p.opacity >= 1) { p.opacity = 1; p.opacityDir = -1 }
        if (p.opacity <= 0.05) { p.opacity = 0.05; p.opacityDir = 1 }

        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    rafId = requestAnimationFrame(render)

    // Pause when tab is hidden — saves CPU entirely
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
      } else {
        lastTime = 0
        rafId = requestAnimationFrame(render)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [particleColor, particleDensity, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
