"use client"

import React from "react"
import { flushSync } from "react-dom"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "@/theme/theme-animations"

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant
  start?: AnimationStart
  showLabel?: boolean
  url?: string
}

export function ThemeToggleButton({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const transitioning = React.useRef(false)

  const styleId = "theme-transition-styles"

  const updateStyles = React.useCallback((css: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css

  }, [])

  const toggleTheme = React.useCallback(async () => {
    if (!resolvedTheme || transitioning.current) return
    transitioning.current = true
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    let applied = false
    const switchTheme = () => {
      if (applied) return
      applied = true
      // Commit the DOM before the browser captures the new-theme snapshot.
      flushSync(() => setTheme(nextTheme))
    }
    try {
      if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        switchTheme()
        return
      }
      const animation = createAnimation(variant, start, url)
      updateStyles(animation.css)
      const transition = document.startViewTransition(switchTheme)
      // A skipped animation must not produce an unhandled rejection.
      void transition.ready.catch(() => {})
      await transition.finished
    } catch {
      switchTheme()
    } finally {
      transitioning.current = false
    }
  }, [resolvedTheme, setTheme, variant, start, url, updateStyles])

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="w-9 p-0 h-9 relative group outline-none shadow-xs border-[1px] rounded-md size-9 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
      name="Theme Toggle Button"
      type="button"
      aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={resolvedTheme === "dark"}
    >
      <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Theme Toggle </span>
      {showLabel && (
        <>
          <span className="hidden group-hover:block border rounded-full px-2 absolute -top-10">
            {" "}
            variant = {variant}
          </span>
          <span className="hidden group-hover:block border rounded-full px-2 absolute -bottom-10">
            {" "}
            start = {start}
          </span>
        </>
      )}
    </Button>
  )
}
