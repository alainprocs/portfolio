"use client"

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

export interface CarouselItem {
  id: string
  title: string
  summary: string
  url: string
  image: string
  accent?: string
}

interface GalleryHoverCarouselProps {
  heading: string
  items: CarouselItem[]
  accentColor?: string
}

function HoverCard({ item, accentColor }: { item: CarouselItem; accentColor: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={item.url}
      target={item.url.startsWith("http") ? "_blank" : undefined}
      rel={item.url.startsWith("http") ? "noopener" : undefined}
      style={{ display: "block", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          height: 320,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${hovered ? accentColor + "33" : "rgba(255,255,255,0.07)"}`,
          background: "rgba(15,15,20,0.8)",
          transition: "border-color 0.35s ease",
        }}
      >
        {/* Image — shrinks on hover to reveal content panel */}
        <div
          style={{
            height: hovered ? "50%" : "100%",
            transition: "height 0.45s cubic-bezier(0.22,1,0.36,1)",
            position: "relative",
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="320px"
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            }}
          />
        </div>

        {/* Hover content panel — slides up from the bottom half */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            padding: "20px 20px 16px",
            background: "rgba(8,8,12,0.97)",
            backdropFilter: "blur(12px)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
            borderTop: `1px solid ${accentColor}22`,
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: accentColor,
              fontWeight: 600,
            }}
          >
            {item.accent ?? "Project"}
          </div>
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {item.title}
          </h4>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.55,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.summary}
          </p>

          {/* Arrow badge */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: `1px solid ${accentColor}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
              transition: "transform 0.5s ease",
            }}
          >
            <ArrowRight size={12} color={accentColor} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export function GalleryHoverCarousel({
  heading,
  items,
  accentColor = "#05ddfa",
}: GalleryHoverCarouselProps) {
  const [api, setApi]         = useState<CarouselApi>()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    update()
    api.on("select", update)
    return () => { api.off("select", update) }
  }, [api])

  return (
    <section style={{ padding: "clamp(40px,8vw,80px) 0 clamp(50px,10vw,100px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: accentColor,
                marginBottom: 10,
              }}
            >
              Featured work
            </div>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {heading}
            </h3>
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1px solid ${canPrev ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                background: "transparent",
                color: canPrev ? "#fff" : "rgba(255,255,255,0.2)",
                cursor: canPrev ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1px solid ${canNext ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                background: "transparent",
                color: canNext ? "#fff" : "rgba(255,255,255,0.2)",
                cursor: canNext ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ dragFree: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4"
                style={{ maxWidth: 320, minWidth: "min(280px, calc(100vw - 64px))" }}
              >
                <HoverCard item={item} accentColor={accentColor} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
