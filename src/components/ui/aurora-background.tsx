'use client'

import { type ReactNode, useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

// ── Simplex Noise 3D (Stefan Gustavson / Sean McCullough) ────────────
const GRAD3 = [
  [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1],
]

function buildPerm(): number[] {
  const p: number[] = []
  for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256)
  const perm: number[] = []
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]!
  return perm
}

function noise3d(perm: number[], xin: number, yin: number, zin: number): number {
  const F3 = 1 / 3, G3 = 1 / 6
  const s = (xin + yin + zin) * F3
  const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s)
  const t = (i + j + k) * G3
  const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t)

  let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number
  if (x0 >= y0) {
    if (y0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=1;k2=0 }
    else if (x0 >= z0) { i1=1;j1=0;k1=0;i2=1;j2=0;k2=1 }
    else { i1=0;j1=0;k1=1;i2=1;j2=0;k2=1 }
  } else {
    if (y0 < z0) { i1=0;j1=0;k1=1;i2=0;j2=1;k2=1 }
    else if (x0 < z0) { i1=0;j1=1;k1=0;i2=0;j2=1;k2=1 }
    else { i1=0;j1=1;k1=0;i2=1;j2=1;k2=0 }
  }

  const x1 = x0-i1+G3, y1 = y0-j1+G3, z1 = z0-k1+G3
  const x2 = x0-i2+2*G3, y2 = y0-j2+2*G3, z2 = z0-k2+2*G3
  const x3 = x0-1+3*G3, y3 = y0-1+3*G3, z3 = z0-1+3*G3

  const ii = i & 255, jj = j & 255, kk = k & 255
  const gi0 = perm[ii + perm[jj + perm[kk]!]!]! % 12
  const gi1 = perm[ii+i1 + perm[jj+j1 + perm[kk+k1]!]!]! % 12
  const gi2 = perm[ii+i2 + perm[jj+j2 + perm[kk+k2]!]!]! % 12
  const gi3 = perm[ii+1 + perm[jj+1 + perm[kk+1]!]!]! % 12

  const dot = (gi: number, x: number, y: number, z: number) => {
    const g = GRAD3[gi]!
    return g[0]! * x + g[1]! * y + g[2]! * z
  }

  let n0: number, n1: number, n2: number, n3: number
  let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0
  if (t0 < 0) n0 = 0; else { t0 *= t0; n0 = t0 * t0 * dot(gi0, x0, y0, z0) }
  let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1
  if (t1 < 0) n1 = 0; else { t1 *= t1; n1 = t1 * t1 * dot(gi1, x1, y1, z1) }
  let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2
  if (t2 < 0) n2 = 0; else { t2 *= t2; n2 = t2 * t2 * dot(gi2, x2, y2, z2) }
  let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3
  if (t3 < 0) n3 = 0; else { t3 *= t3; n3 = t3 * t3 * dot(gi3, x3, y3, z3) }

  return 32 * (n0 + n1 + n2 + n3)
}

// ── Stars ────────────────────────────────────────────────────────────
interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  phase: number
}

function createStars(w: number, h: number, count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.8 + 0.3,
    phase: Math.random() * Math.PI * 2,
  }))
}

// ── Component ────────────────────────────────────────────────────────
interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const auroraRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const starsDataRef = useRef<Star[]>([])
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => { setMounted(true) }, [])

  const setupStars = useCallback((w: number, h: number) => {
    starsDataRef.current = createStars(w, h, 80)
  }, [])

  useEffect(() => {
    if (!isDark) return

    const auroraCanvas = auroraRef.current
    const starsCanvas = starsRef.current
    if (!auroraCanvas || !starsCanvas) return
    const aCtx = auroraCanvas.getContext('2d')
    const sCtx = starsCanvas.getContext('2d')
    if (!aCtx || !sCtx) return

    const perm = buildPerm()
    const SCALE = 3
    let aw = 0, ah = 0, sw = 0, sh = 0

    const resize = () => {
      const fullW = auroraCanvas.offsetWidth
      const fullH = auroraCanvas.offsetHeight

      // Aurora — low res
      aw = Math.ceil(fullW / SCALE)
      ah = Math.ceil(fullH / SCALE)
      auroraCanvas.width = aw
      auroraCanvas.height = ah

      // Stars — native DPR
      const dpr = window.devicePixelRatio || 1
      sw = fullW
      sh = fullH
      starsCanvas.width = sw * dpr
      starsCanvas.height = sh * dpr
      sCtx.scale(dpr, dpr)

      setupStars(sw, sh)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const now = Date.now()
      const time = now / 4000

      // ── Aurora ──
      const grad = aCtx.createLinearGradient(0, 0, ah / 0.4, ah * 0.9)
      grad.addColorStop(0, 'rgba(50,40,110,1)')
      grad.addColorStop((Math.sin(time) + 1) * 0.1, 'rgba(120,40,90,0.35)')
      grad.addColorStop((Math.cos(time) + 1) * 0.1 + 0.42, 'rgba(30,110,200,0.65)')
      grad.addColorStop(0.65, 'rgba(40,45,110,0.35)')
      grad.addColorStop(1, 'rgba(25,90,170,0.5)')
      aCtx.fillStyle = grad
      aCtx.fillRect(0, 0, aw, ah)

      // Fade to dark at bottom
      const fadeGrad = aCtx.createLinearGradient(0, 0, 0, ah * 0.55)
      fadeGrad.addColorStop(0, 'rgba(0,0,0,0.01)')
      fadeGrad.addColorStop(1, 'rgba(0,0,0,1)')
      aCtx.fillStyle = fadeGrad
      aCtx.fillRect(0, 0, aw, ah)

      // Noise distortion
      const base = aCtx.getImageData(0, 0, aw, ah)
      const out = aCtx.createImageData(aw, ah)
      const src = base.data, dst = out.data
      const scaleX = 4 / 0.3, scaleY = 0.25 / 0.3

      for (let j = 0, idx = 0; j < aw * ah; j++, idx += 4) {
        const px = j % aw, py = Math.floor(j / aw)
        const frequency = 0.6
        const n = noise3d(perm, (px / aw) * frequency * scaleX, (py / ah) * frequency * scaleY, time)
        const factor = n * 0.5 + 0.5

        dst[idx]     = Math.floor(factor * src[idx]!)
        dst[idx + 1] = Math.floor(factor * src[idx + 1]!)
        dst[idx + 2] = Math.floor(factor * src[idx + 2]!)
        dst[idx + 3] = 255
      }
      aCtx.putImageData(out, 0, 0)

      // ── Stars ──
      sCtx.clearRect(0, 0, sw, sh)
      const stars = starsDataRef.current
      const timeS = now / 1000

      for (const star of stars) {
        // Twinkle via sin wave with unique phase and speed
        const twinkle = Math.sin(timeS * star.speed + star.phase)
        const alpha = star.opacity * (0.5 + twinkle * 0.5)

        if (alpha <= 0.02) continue

        sCtx.beginPath()
        sCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        sCtx.fillStyle = `rgba(220,230,255,${alpha})`
        sCtx.fill()

        // Glow for brighter stars
        if (star.size > 1.2 && alpha > 0.4) {
          sCtx.beginPath()
          sCtx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          sCtx.fillStyle = `rgba(180,200,255,${alpha * 0.15})`
          sCtx.fill()
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isDark, setupStars])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isDark && (
        <>
          {/* Aurora — low-res canvas scaled up */}
          <canvas
            ref={auroraRef}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-65"
            aria-hidden
          />
          {/* Stars — native resolution overlay */}
          <canvas
            ref={starsRef}
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
