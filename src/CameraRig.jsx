import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'

export default function CameraRig({ children }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    easing.damp3(
      groupRef.current.rotation,
      [
        (-state.pointer.y * state.viewport.height) / 60 / 5,
        (state.pointer.x * state.viewport.width) / 60 / 5,
        0
      ],
      0.5,
      delta
    )
  })

  return <group ref={groupRef}>{children}</group>
}
