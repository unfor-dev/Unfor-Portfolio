/**
 * Scene Component
 * ===============
 * 3D scene komponenti - Canvas va barcha 3D elementlar.
 *
 * O'zgartirildi:
 * - onProjectClick prop qo'shildi - Model3 dan project click ni tashqariga uzatish uchun
 */

import React, { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import './styles.css'
import { Billboard, Capsule, Environment, Float, Lightformer, MeshTransmissionMaterial, Text, Grid, OrbitControls, Stars } from '@react-three/drei'
import Model1 from './Model1'
import Model2 from './Model2'
import Particles from './Particles'
import { Bloom, DepthOfField, EffectComposer, HueSaturation, Vignette, Glitch } from '@react-three/postprocessing'
import CameraRig from './CameraRig'
import CameraAnimation from './CameraAnimation'
import Effects from './Effects'
import { CircleGeometry } from 'three'
import { Perf } from 'r3f-perf'
import Model3 from './Model3'
import FlyingStars from './FlyingStars'


function Scene({ onProjectClick }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }} shadows={false}>


      <Perf position="bottom-left" />

      {/* <color args={['#222222']} attach="background" /> */}
      <Suspense fallback={null}>
        {/* <CameraRig> */}

          <group >
            <Model1 scale={1.3} position={[0, -4, 1.3]} rotation={[-0.1, -0.1, 0]} />
            <Model2 scale={3.3}  />
            {/* O'zgartirildi: onProjectClick prop qo'shildi */}
            <Model3 scale={0.02} position={[0, -50.45, 2.136]} rotation={[1.5, 0, 0]} onProjectClick={onProjectClick} />
          </group>



          {/* <OrbitControls enablePan={true} onChange={ (e) => {
            const c = e. target.object.position
            console. log(c.x, c.y, c.z)
            }}
            /> */}

          {/* <spotLight
            position={[-5, 3, -5]}
            intensity={3}
            angle={0.4}
            penumbra={0.5}
            color={'white'}
          /> */}
          {/* <pointLight
            // position={[x, y, z]}
            intensity={11}
            distance={4}
            color="white"
          /> */}


          <Environment files="/studioEnv.hdr" environmentIntensity={0.5} resolution={50} />


          {/* <Particles particlesCount={100} /> */}
          {/* <Stars saturation={0} count={200} speed={2} /> */}
          <FlyingStars count={100} />


        {/* </CameraRig> */}
        <Effects />

        <CameraAnimation />
      </Suspense>
    </Canvas>
  )
}

export default Scene

