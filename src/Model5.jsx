import React, { useEffect, useMemo, useRef } from 'react'
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber';

export default function Model5(props) {
  const { nodes, materials } = useGLTF('/model5.glb')

  materials['Material.001'].metalness = 1;
  materials['Material.001'].roughness = 0.1;
  materials['Material.001'].color.set("#222222");
  materials['Material.001'].needsUpdate = true;

  const lampMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    emissive: 'white',
    emissiveIntensity: 15,
    toneMapped: false,
  }), [])

  

    const video1Ref = useRef();
    // const video2Ref = useRef();

    
    // ---------- VIDEO 1 ----------
    const video1 = document.createElement("video");
    video1.src = process.env.PUBLIC_URL + "/img/mm.mp4";
    video1.loop = true;
    video1.muted = true;
    video1.playsInline = true;
    video1.playbackRate = 0.7;
    video1.play();

    const texture1 = new THREE.VideoTexture(video1);
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(1, 1);
    texture1.rotation = Math.PI / -2;

    video1Ref.current = texture1;


    // ---------- VIDEO 1 ----------
    // const video1 = document.createElement("video");
    // video1.src = process.env.PUBLIC_URL + "/img/n.mp4";
    // video1.loop = true;
    // video1.muted = true;
    // video1.playsInline = true;
    // video1.playbackRate = 0.7;
    // video1.play();

    // const texture1 = new THREE.VideoTexture(video1);
    // texture1.wrapS = THREE.RepeatWrapping;
    // texture1.wrapT = THREE.RepeatWrapping;
    // texture1.repeat.set(1, 1);
    // texture1.rotation = Math.PI / -2;

    // video1Ref.current = texture1;


    // ---------- VIDEO 2 ----------
    // const video2 = document.createElement("video");
    // video2.src = process.env.PUBLIC_URL + "/img/mm.mp4";   // boshqa video
    // video2.loop = true;
    // video2.muted = true;
    // video2.playsInline = true;
    // video2.playbackRate = 1;
    // video2.play();

    // const texture2 = new THREE.VideoTexture(video2);
    // texture2.wrapS = THREE.RepeatWrapping;
    // texture2.wrapT = THREE.RepeatWrapping;
    // texture2.repeat.set(1, 1);
    // texture2.rotation = Math.PI / 1;

    // video2Ref.current = texture2;


        const textureImg = useLoader(
              THREE.TextureLoader,
              process.env.PUBLIC_URL + "/img/m.jpg"
        );
          
        textureImg.wrapS = THREE.RepeatWrapping;
        textureImg.wrapT = THREE.RepeatWrapping;
        textureImg.repeat.set(1, 1); 



  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="pillar_left" position={[-8.054, 0, 2.021]} rotation={[0, 1.571, 0]} />
        <mesh
          name="screen1"
          castShadow
          receiveShadow
          geometry={nodes.screen1.geometry}
          material={materials['screen1.002']}
          position={[0, 0, -4.945]}>
          <mesh
            name="ekran1"
            castShadow
            receiveShadow
            geometry={nodes.ekran1.geometry}
            
            position={[-2.994, 0.15, 5.01]}
            rotation={[Math.PI, -Math.PI / 6, Math.PI]}
            scale={[1.26, 1.2, 0.6]}
          >
            {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
          </mesh>
          <mesh
            name="screenLight1"
            castShadow
            receiveShadow
            geometry={nodes.screenLight1.geometry}
            material={materials['screen-light']}
            position={[-3.006, 0.072, 4.99]}
            rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
            scale={[0.048, 0.009, 1.38]}
          />
        </mesh>
        <mesh
          name="screen2"
          castShadow
          receiveShadow
          geometry={nodes.screen2.geometry}
          material={materials['screen2.002']}>
          <mesh
            name="ekran2"
            castShadow
            receiveShadow
            geometry={nodes.ekran2.geometry}
            
            position={[2.994, 0.15, -4.99]}
            rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
            scale={[1.26, 1.2, 0.6]}
          >
            {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
          </mesh>
          <mesh
            name="screenLight2"
            castShadow
            receiveShadow
            geometry={nodes.screenLight2.geometry}
            material={materials['screen-light']}
            position={[3.009, 0.072, -5.016]}
            rotation={[0, Math.PI / 3, 0]}
            scale={[0.048, 0.009, 1.38]}
          />
        </mesh>
        <group name="pillar_left001" position={[-8.054, 0, -17.92]} rotation={[0, 1.571, 0]} />
        <group name="new-arch003" position={[0, 0, -19.941]} />
        <group name="new-arch005" position={[0, 0, -19.941]}>
          <mesh
            name="floor-reka-chap"
            castShadow
            receiveShadow
            geometry={nodes['floor-reka-chap'].geometry}
            // material={materials['Material.003']}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshStandardMaterial 
              emissive='white'
              color='white'
              emissiveIntensity={15}
              toneMapped={false}
            />
          </mesh>
          <mesh
            name="floor-reka-ung"
            castShadow
            receiveShadow
            geometry={nodes['floor-reka-ung'].geometry}
            // material={materials['Material.001']}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
          <meshStandardMaterial 
            emissive='white'
            color='white'
            emissiveIntensity={15}
            toneMapped={false}
            />
          </mesh>
          <mesh
            name="floorr"
            castShadow
            receiveShadow
            geometry={nodes.floorr.geometry}
            // material={materials['Material.003']}
            position={[0, 0, -62.957]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshStandardMaterial
              // map={videoRef.current}
              // toneMapped={false}
              color={'#030609'}
            />
              {/* <MeshReflectorMaterial
                blur={[300, 50]}
                resolution={1024}
                mixBlur={1}
                mixStrength={100}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#202020"
                metalness={0.8}
              /> */}
          </mesh>
          <mesh
            name="shifr"
            castShadow
            receiveShadow
            geometry={nodes.shifr.geometry}
            material={materials['Material.001']}
            position={[0, 32.575, -57.139]}
            scale={[-1.466, -1, -11.661]}
          />
        </group>
        <group name="Empty003" position={[0, 0, -19.941]}>
          <mesh
            name="screen1001"
            castShadow
            receiveShadow
            geometry={nodes.screen1001.geometry}
            material={materials['screen1.003']}>
            <mesh
              name="ekran3"
              castShadow
              receiveShadow
              geometry={nodes.ekran3.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1001"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1001.geometry}
              material={materials['screen-light.002']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2001"
            castShadow
            receiveShadow
            geometry={nodes.screen2001.geometry}
            material={materials['screen2.003']}>
            <mesh
              name="ekran4"
              castShadow
              receiveShadow
              geometry={nodes.ekran4.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2001"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2001.geometry}
              material={materials['screen-light.002']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="Empty004" position={[0, 0, -19.941]}>
          <mesh
            name="light-1-cover001"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover001'].geometry}
            material={materials['light2-cover.012']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner001"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner001'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover001"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover001'].geometry}
            material={materials['light2-cover.011']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner001"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner001'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover001"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover001'].geometry}
            material={materials['light2-cover.010']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner001"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner001'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <mesh
          name="urta-reka"
          castShadow
          receiveShadow
          geometry={nodes['urta-reka'].geometry}
          // material={materials['floor-whole.005']}
          position={[0, 0.017, -82.92]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.082, -1, -11.048]}
        >
          {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
        </mesh>
        <group name="pillar_left004" position={[-8.054, 0, -57.823]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left005" position={[-8.054, 0, -37.882]} rotation={[0, 1.571, 0]} />
        <group name="new-arch008" position={[0, 0, -59.844]} />
        <group name="Empty006" position={[0, 0, -59.844]}>
          <mesh
            name="screen1002"
            castShadow
            receiveShadow
            geometry={nodes.screen1002.geometry}
            material={materials['screen1.004']}>
            <mesh
              name="ekran7"
              castShadow
              receiveShadow
              geometry={nodes.ekran7.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1002"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1002.geometry}
              material={materials['screen-light.003']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2002"
            castShadow
            receiveShadow
            geometry={nodes.screen2002.geometry}
            material={materials['screen2.004']}>
            <mesh
              name="ekran8"
              castShadow
              receiveShadow
              geometry={nodes.ekran8.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2002"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2002.geometry}
              material={materials['screen-light.003']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="Empty007" position={[0, 0, -39.903]}>
          <mesh
            name="screen1003"
            castShadow
            receiveShadow
            geometry={nodes.screen1003.geometry}
            material={materials['screen1.005']}>
            <mesh
              name="ekran5"
              castShadow
              receiveShadow
              geometry={nodes.ekran5.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1003"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1003.geometry}
              material={materials['screen-light.004']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2003"
            castShadow
            receiveShadow
            geometry={nodes.screen2003.geometry}
            material={materials['screen2.005']}>
            <mesh
              name="ekran6"
              castShadow
              receiveShadow
              geometry={nodes.ekran6.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2003"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2003.geometry}
              material={materials['screen-light.004']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="pillar_left010" position={[-8.054, 0, -117.673]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left011" position={[-8.054, 0, -137.614]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left014" position={[-8.054, 0, -97.711]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left015" position={[-8.054, 0, -77.77]} rotation={[0, 1.571, 0]} />
        <group name="new-arch020" position={[0, 0, -99.731]} />
        <group name="Empty010" position={[0, 0, -119.693]}>
          <mesh
            name="screen1004"
            castShadow
            receiveShadow
            geometry={nodes.screen1004.geometry}
            material={materials['screen1.006']}>
            <mesh
              name="ekran13"
              castShadow
              receiveShadow
              geometry={nodes.ekran13.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1004"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1004.geometry}
              material={materials['screen-light.005']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2004"
            castShadow
            receiveShadow
            geometry={nodes.screen2004.geometry}
            material={materials['screen2.006']}>
            <mesh
              name="ekran14"
              castShadow
              receiveShadow
              geometry={nodes.ekran14.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2004"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2004.geometry}
              material={materials['screen-light.005']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="Empty011" position={[0, 0, -139.634]}>
          <mesh
            name="screen1005"
            castShadow
            receiveShadow
            geometry={nodes.screen1005.geometry}
            material={materials['screen1.007']}>
            <mesh
              name="ekran15"
              castShadow
              receiveShadow
              geometry={nodes.ekran15.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1005"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1005.geometry}
              material={materials['screen-light.006']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2005"
            castShadow
            receiveShadow
            geometry={nodes.screen2005.geometry}
            material={materials['screen2.007']}>
            <mesh
              name="ekran16"
              castShadow
              receiveShadow
              geometry={nodes.ekran16.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2005"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2005.geometry}
              material={materials['screen-light.006']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="Empty014" position={[0, 0, -99.731]}>
          <mesh
            name="screen1006"
            castShadow
            receiveShadow
            geometry={nodes.screen1006.geometry}
            material={materials['screen1.008']}>
            <mesh
              name="ekran11"
              castShadow
              receiveShadow
              geometry={nodes.ekran11.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1006"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1006.geometry}
              material={materials['screen-light.007']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2006"
            castShadow
            receiveShadow
            geometry={nodes.screen2006.geometry}
            material={materials['screen2.008']}>
            <mesh
              name="ekran12"
              castShadow
              receiveShadow
              geometry={nodes.ekran12.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2006"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2006.geometry}
              material={materials['screen-light.007']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="Empty015" position={[0, 0, -79.79]}>
          <mesh
            name="screen1007"
            castShadow
            receiveShadow
            geometry={nodes.screen1007.geometry}
            material={materials['screen1.009']}>
            <mesh
              name="ekran9"
              castShadow
              receiveShadow
              geometry={nodes.ekran9.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1007"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1007.geometry}
              material={materials['screen-light.008']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2007"
            castShadow
            receiveShadow
            geometry={nodes.screen2007.geometry}
            material={materials['screen2.009']}>
            <mesh
              name="ekran10"
              castShadow
              receiveShadow
              geometry={nodes.ekran10.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2007"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2007.geometry}
              material={materials['screen-light.008']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <group name="pillar_left017" position={[5.533, 0, 2.021]} rotation={[0, -0.017, 0]} />
        <group name="pillar_left018" position={[5.533, 0, -18.12]} rotation={[0, -1.567, 0]} />
        <group name="pillar_left019" position={[5.533, 0, -33.728]} rotation={[0, 0.021, 0]} />
        <group name="pillar_left020" position={[5.533, 0, -57.573]} rotation={[0, 1.538, 0]} />
        <group name="pillar_left021" position={[5.533, 0, -77.048]} rotation={[0, 1.538, 0]} />
        <group
          name="pillar_left022"
          position={[5.533, 0, -97.236]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <group
          name="pillar_left023"
          position={[5.533, 0, -117.643]}
          rotation={[-Math.PI, 1.566, -Math.PI]}
        />
        <group
          name="pillar_left024"
          position={[5.533, 0, -133.652]}
          rotation={[-Math.PI, 1.566, -Math.PI]}
        />
        <group
          name="pillar_left002"
          position={[5.533, 0, -173.143]}
          rotation={[-Math.PI, 1.566, -Math.PI]}
        />
        <group
          name="pillar_left003"
          position={[5.533, 0, -157.134]}
          rotation={[-Math.PI, 1.566, -Math.PI]}
        />
        <group name="pillar_left006" position={[-8.054, 0, -177.105]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left007" position={[-8.054, 0, -157.164]} rotation={[0, 1.571, 0]} />
        <group name="Empty002" position={[0, 0, -159.184]}>
          <mesh
            name="screen1009"
            castShadow
            receiveShadow
            geometry={nodes.screen1009.geometry}
            material={materials['screen1.010']}>
            <mesh
              name="ekran17"
              castShadow
              receiveShadow
              geometry={nodes.ekran17.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight1009"
              castShadow
              receiveShadow
              geometry={nodes.screenLight1009.geometry}
              material={materials['screen-light.009']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2009"
            castShadow
            receiveShadow
            geometry={nodes.screen2009.geometry}
            material={materials['screen2.010']}>
            <mesh
              name="ekran18"
              castShadow
              receiveShadow
              geometry={nodes.ekran18.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
            >
              {video1Ref.current && (
                <meshBasicMaterial
                map={video1Ref.current}
                toneMapped={false}
              />)}
            </mesh>
            <mesh
              name="screenLight2009"
              castShadow
              receiveShadow
              geometry={nodes.screenLight2009.geometry}
              material={materials['screen-light.009']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <mesh
          name="wall-right"
          castShadow
          receiveShadow
          geometry={nodes['wall-right'].geometry}
          position={[-13.6, 8.092, -84.928]}
          rotation={[0, 0, -1.561]}
          scale={[8.268, 1, 106.705]}
        >
          {video1Ref.current && (
            <meshBasicMaterial
            map={video1Ref.current}
            toneMapped={false}
          />)}
        </mesh>
        <mesh
          name="devor-oxiri"
          castShadow
          receiveShadow
          geometry={nodes['devor-oxiri'].geometry}
          // material={materials['Material.001']}
          position={[-0.043, 8.158, -191.448]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-13.916, -1, -8.294]}
        >
          {video1Ref.current && (
            <meshBasicMaterial
            map={video1Ref.current}
            toneMapped={false}
          />)}
        </mesh>
        <mesh
          name="wall-left"
          castShadow
          receiveShadow
          geometry={nodes['wall-left'].geometry}
          position={[13.6, 8.092, -84.928]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[8.268, 1, 106.705]}
        >
          {video1Ref.current && (
            <meshBasicMaterial
            map={video1Ref.current}
            toneMapped={false}
          />)}
        </mesh>
        <mesh
          name="Screen"
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
          position={[-0.009, 3.982, -179.999]}
          scale={2.571}
        >
          {/* {video1Ref.current && (
            <meshBasicMaterial
            map={video1Ref.current}
            toneMapped={false}
          />)} */}
          <meshBasicMaterial
            color={'gray'}
          />
        </mesh>
        <group name="Empty001" position={[0, 0, -37.084]}>
          <mesh
            name="light-1-cover002"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover002'].geometry}
            material={materials['light2-cover.003']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner002"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner002'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover002"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover002'].geometry}
            material={materials['light2-cover.002']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner002"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner002'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover002"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover002'].geometry}
            material={materials['light2-cover.001']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner002"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner002'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty005" position={[0, 0, -54.185]}>
          <mesh
            name="light-1-cover003"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover003'].geometry}
            material={materials['light2-cover.006']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner003"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner003'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover003"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover003'].geometry}
            material={materials['light2-cover.005']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner003"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner003'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover003"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover003'].geometry}
            material={materials['light2-cover.004']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner003"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner003'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty008" position={[0, 0, -74.071]}>
          <mesh
            name="light-1-cover004"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover004'].geometry}
            material={materials['light2-cover.009']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner004"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner004'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover004"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover004'].geometry}
            material={materials['light2-cover.008']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner004"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner004'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover004"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover004'].geometry}
            material={materials['light2-cover.007']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner004"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner004'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty009" position={[0, 0, -93.786]}>
          <mesh
            name="light-1-cover005"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover005'].geometry}
            material={materials['light2-cover.015']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner005"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner005'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover005"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover005'].geometry}
            material={materials['light2-cover.014']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner005"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner005'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover005"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover005'].geometry}
            material={materials['light2-cover.013']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner005"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner005'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty012" position={[0, 0, -113.243]}>
          <mesh
            name="light-1-cover006"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover006'].geometry}
            material={materials['light2-cover.018']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner006"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner006'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover006"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover006'].geometry}
            material={materials['light2-cover.017']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner006"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner006'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover006"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover006'].geometry}
            material={materials['light2-cover.016']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner006"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner006'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty013" position={[0, 0, -133.258]}>
          <mesh
            name="light-1-cover007"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover007'].geometry}
            material={materials['light2-cover.021']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner007"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner007'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover007"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover007'].geometry}
            material={materials['light2-cover.020']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner007"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner007'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover007"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover007'].geometry}
            material={materials['light2-cover.019']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner007"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner007'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty016" position={[0, 0, -153.316]}>
          <mesh
            name="light-1-cover008"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover008'].geometry}
            material={materials['light2-cover.024']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner008"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner008'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover008"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover008'].geometry}
            material={materials['light2-cover.023']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner008"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner008'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover008"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover008'].geometry}
            material={materials['light2-cover.022']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner008"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner008'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty017" position={[0, 0, -172.774]}>
          <mesh
            name="light-1-cover009"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover009'].geometry}
            material={materials['light2-cover.027']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner009"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner009'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover009"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover009'].geometry}
            material={materials['light2-cover.026']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner009"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner009'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover009"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover009'].geometry}
            material={materials['light2-cover.025']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner009"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner009'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty018" position={[0, 0, -192.145]}>
          <mesh
            name="light-1-cover010"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover010'].geometry}
            material={materials['light2-cover.030']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner010"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner010'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover010"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover010'].geometry}
            material={materials['light2-cover.029']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner010"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner010'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover010"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover010'].geometry}
            material={materials['light2-cover.028']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner010"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner010'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <mesh
          name="light-3-inner011"
          castShadow
          receiveShadow
          geometry={nodes['light-3-inner011'].geometry}
          material={materials['light2-inner.031']}
          position={[-2.984, -14.998, -163.625]}
        />
        <group name="Empty019" position={[0, 0, -211.891]}>
          <mesh
            name="light-1-cover011"
            castShadow
            receiveShadow
            geometry={nodes['light-1-cover011'].geometry}
            material={materials['light2-cover.033']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner011"
            castShadow
            receiveShadow
            geometry={nodes['light-1-inner011'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover011"
            castShadow
            receiveShadow
            geometry={nodes['light-2-cover011'].geometry}
            material={materials['light2-cover.032']}
            position={[-0.984, -16.644, 48.266]}
          />
          <mesh
            name="light-2-inner011"
            castShadow
            receiveShadow
            geometry={nodes['light-2-inner011'].geometry}
            material={lampMaterial}
            position={[-0.984, -16.644, 48.266]}
          />
          <mesh
            name="light-3-cover011"
            castShadow
            receiveShadow
            geometry={nodes['light-3-cover011'].geometry}
            material={materials['light2-cover.031']}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty020" position={[0, 0, -211.942]}>
          <mesh
            name="light-3-inner012"
            castShadow
            receiveShadow
            geometry={nodes['light-3-inner012'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model5.glb')
