import { useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom, LUT, Glitch, ToneMapping, Vignette, DepthOfField, GodRays } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { useMemo } from 'react'
import { isMobile } from 'react-device-detect'

export default function Effects() {
  const texture = useLoader(LUTCubeLoader, '/F-6800-STD.cube')

  // 🔹 Adaptiv sozlamalar — platformaga qarab o‘zgaradi
  const config = useMemo(() => ({
    bloomIntensity: isMobile ? 0.05 : 0.12,
    glitchStrength: isMobile ? 0.1 : 0.25,
    glitchDelay: isMobile ? 4 : 3,
  }), [])

  return (
    <EffectComposer disableNormalPass multisampling={isMobile ? 0 : 4}>
      {/* 🎞 LUT — kino rang ohangi */}
      <LUT lut={texture} />

      {/* ✨ Bloom — HD tiniqlik va yorug‘likning “diffuse” effektini beradi */}
      <Bloom
        mipmapBlur
        luminanceThreshold={0.9}
        intensity={0.05}
        radius={0.6}
      />

      {/* <GodRays sun={sunRef} exposure={0.34} decay={0.8} blur /> */}

      {/* 🎬 ToneMapping — professional kontrast va HDR balans */}
      {/* <ToneMapping adaptive={false} /> */}

      {/* ⚡ Glitch — wow momentlar uchun (vaqti-vaqti bilan chiroyli shovqin) */}
      {/* <Glitch duration={0.5} strength={0.2} ratio={1} delay={3.5} /> */}

    </EffectComposer>
  )
}
