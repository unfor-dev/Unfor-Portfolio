import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

export default function CameraAnimation() {
  const { camera } = useThree()

  useEffect(() => {
    const positions = [
      { x: 0, y: 0, z: 3, lookAt: [0, 0, 0] }, // section-1
      { x: 1.962, y: -0.991, z: 1.372, lookAt: [-1, 0.5, 0.6] }, // section-2 
      { x: 1.355, y: -0.425, z: -0.139, lookAt: [-0.5, 0, 3] }, // section-3 
      { x: 0, y: -1.05, z: 3, lookAt: [0, -1.3, 10] }, // section-4 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.833, z: 2.206, lookAt: [0, 0, 0] }, // section-5 
      { x: 0, y: -50.800, z: 2.206, lookAt: [0, 0, 0] },    // section-6
      { x: 0, y: -50.500, z: 2.187, lookAt: [0, -15, 0] },  // section-7
      { x: 0, y: -49.800, z: 2.135, lookAt: [0, -15, 0] },  // section-8
      { x: 0, y: -49.0, z: 2.080, lookAt: [0, -15, 0] },    // section-9 49
      { x: 0, y: -48.400, z: 2.040, lookAt: [0, -15, 0] }, // section-10
      { x: 0, y: -47.800, z: 2, lookAt: [0, -15, 0] },    // section-11
      { x: 0, y: -47.200, z: 1.98, lookAt: [0, -15, 0] }, // section-12
      { x: 0, y: -47.100, z: 1.98, lookAt: [0, -15, 0] }, // section-13
      { x: 0, y: -47.100, z: 1.98, lookAt: [0, -15, 0] }, // section-14
      { x: 0, y: -47.100, z: 1.98, lookAt: [0, -15, 0] }  // section-15
    ]

    const proxy = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    const target = new THREE.Vector3(0, 0, 0) // ko‘z nuqtasi

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: false,
      },
      defaults: { ease: "none" },
      onUpdate: () => {
        camera.position.set(proxy.x, proxy.y, proxy.z)
        camera.lookAt(target)
      },
    })

    positions.forEach((p) => {
      tl.to(proxy, { x: p.x, y: p.y, z: p.z }, ">")
      tl.to(target, { x: p.lookAt[0], y: p.lookAt[1], z: p.lookAt[2] }, "<")
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      tl.kill()
    }
  }, [camera])

  return null
}
