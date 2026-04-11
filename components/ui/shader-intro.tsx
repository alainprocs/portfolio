"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShaderAnimation } from "./shader-animation"

const DURATION = 2800 // ms before auto-dismiss

export function ShaderIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  // Drive the progress bar
  useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setVisible(false)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const dismiss = () => setVisible(false)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="shader-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          {/* Shader fills the entire screen */}
          <div style={{ position: "absolute", inset: 0 }}>
            <ShaderAnimation />
          </div>

          {/* Dark vignette so text pops */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Center content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              pointerEvents: "none",
            }}
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 32, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.22em" }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                fontSize: "clamp(1.4rem, 5vw, 3.2rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textShadow: "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(5,221,250,0.3)",
              }}
            >
              Alain Procs
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-sora), sans-serif",
                fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Go-To-Market Engineer
            </motion.div>
          </div>

          {/* Progress bar — bottom of screen */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #05ddfa, #8c31e8)",
                transition: "none",
                boxShadow: "0 0 8px #05ddfa",
              }}
            />
          </div>

          {/* Skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 20,
              right: 24,
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sora), sans-serif",
              pointerEvents: "none",
            }}
          >
            Click to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
