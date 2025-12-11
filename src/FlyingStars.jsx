import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

export default function FlyingStars({ count = 200 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 100; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;  // Y
      arr[i * 3 + 2] = Math.random() * -200;        // Z (deep space)
      
    }

    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    for (let i = 0; i < count; i++) {
      // Z ni o'zgartiramiz -> kameraga qarab keladi
      positions[i * 3 + 2] += 0.4; 

      // agar kamera oldiga yaqinlashsa qayta reset bo'ladi
      if (positions[i * 3 + 2] > 5) {
        positions[i * 3 + 2] = -200;
        positions[i * 3 + 2] += Math.random() * 0.8 + 0.6;

      }
    }


    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.2}
        color="white"
        sizeAttenuation
        opacity={0.5}
        transparent
        
      />
    </points>
  );
}
