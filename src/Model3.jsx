/**
 * Model3 Component
 * ================
 * 3D model komponenti - portfolio ekranlari bilan.
 *
 * O'zgartirildi:
 * - projects.js dan ma'lumotlar import qilindi
 * - onClick lar window.location.href ga o'zgartirildi (navigate uchun)
 * - Har bir ekran o'z project ID si bilan bog'landi
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber';
// Projects data import - har bir ekran uchun project ma'lumotlari
import { getProjectByEkranId } from './data/projects';

export default function Model3({ onProjectClick, ...props }) {
  const { nodes, materials } = useGLTF('/model3.glb')

  const [hoveredScreen, setHoveredScreen] = useState({});

  /**
   * Ekran bosilganda project modal ochish
   * O'zgartirildi: window.location.href o'rniga callback ishlatiladi
   * @param {string} ekranId - Ekran identifikatori (masalan: "ekran1")
   */
  const handleScreenClick = (ekranId) => {
    const project = getProjectByEkranId(ekranId);
    if (project && onProjectClick) {
      // Parent komponentga project ID ni yuborish
      onProjectClick(project.id);
    }
  };


  // Shift
  materials['Material.001'].metalness = 0.8;
  materials['Material.001'].roughness = 1;
  materials['Material.001'].color.set("#222222");
  materials['Material.001'].needsUpdate = true;


  // Lampalar, Chiroq
  const lampMaterial = useMemo(() => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color("white") },
      uIntensity: { value: 30.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      void main() {
        gl_FragColor = vec4(uColor * uIntensity, 1.0);
      }
    `,
    transparent: false,
    toneMapped: false
    });
  }, []);


const lamp1Material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("gray") },
        uIntensity: { value: 2.5 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        void main() {
          gl_FragColor = vec4(uColor * uIntensity, 1.0);
        }
      `,
      transparent: false,
      toneMapped: false
    });
  }, []);




  
    // Video
    // VIDEO 1

    const [video1Texture, setVideo1Texture] = useState(null);
    useEffect(() => {
      const video = document.createElement("video");
      video.src = process.env.PUBLIC_URL + "/img/video-test.mp4";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 1;
      video.play();

      const texture = new THREE.VideoTexture(video);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.rotation = Math.PI / -2;

      setVideo1Texture(texture);
    }, []);


    // VIDEO 2
    // const [video2Texture, setVideo2Texture] = useState(null);
    // useEffect(() => {
    //   const video2 = document.createElement("video");
    //   video2.src = process.env.PUBLIC_URL + "/img/nn.mp4";
    //   video2.muted = true;
    //   video2.playsInline = true;
    //   video2.playbackRate = 1.5;
    //   video2.play();


    //   // Video tugaganda 5 soniya kutish va qayta o'ynatish
    //   video2.addEventListener('ended', function() {
    //       setTimeout(() => {
    //           video2.play();
    //       }, 10000);
    //   });

    //   video2.play();

    //   const texture2 = new THREE.VideoTexture(video2);
    //     texture2.wrapS = THREE.RepeatWrapping;
    //     texture2.wrapT = THREE.RepeatWrapping;
    //     texture2.repeat.set(1, 1);
    //     texture2.rotation = Math.PI / -2;

    //   setVideo2Texture(texture2);
    // }, []);


    // // VIDEO 3 video2Rst video3Ref = useRef();
    // const [video3Texture, setVideo3Texture] = useState(null);
    // useEffect(() => {
    //   const video3 = document.createElement("video");
    //   video3.src = process.env.PUBLIC_URL + "/img/nn.mp4";
    //   video3.loop = true;
    //   video3.muted = true;
    //   video3.playsInline = true;
    //   video3.playbackRate = 1.0;
    //   video3.play();

    //   const texture3 = new THREE.VideoTexture(video3);
    //   texture3.wrapS = THREE.RepeatWrapping;
    //   texture3.wrapT = THREE.RepeatWrapping;
    //   texture3.repeat.set(1, 1);
    //   texture3.rotation = Math.PI / 1;

    // setVideo3Texture(texture3);
    // }, []);


    // Texture
    const textureImg = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/floor.jpg"
    );
      
    textureImg.wrapS = THREE.RepeatWrapping;
    textureImg.wrapT = THREE.RepeatWrapping;
    textureImg.repeat.set(1, 5); 

    const texture1Img = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/img/2.jpg"
    );
      
    texture1Img.wrapS = THREE.RepeatWrapping;
    texture1Img.wrapT = THREE.RepeatWrapping;
    // texture1Img.colorSpace = THREE.SRGBColorSpace;
    texture1Img.repeat.set(1, 1); 

    const texture2Img = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/5.jpg"
    );
      
    texture2Img.wrapS = THREE.RepeatWrapping;
    texture2Img.wrapT = THREE.RepeatWrapping;
    texture2Img.rotation = Math.PI / -2;
    texture2Img.repeat.set(2.4, 1); 
    // texture2Img.repeat.set(4, 1); 
    // texture2Img.repeat.set(3, 1); 

    const useImages = () => {
    const renderer = useThree((state) => state.gl);

    const texture3Img = useLoader(
      THREE.TextureLoader,
      Array.from({ length: 19 }, (_, i) =>
        process.env.PUBLIC_URL + `/img/img/${i + 1}.jpg`
      )
    );

    texture3Img.forEach((tex) => {
      // kerakli orientatsiya
      tex.flipY = false;
      tex.rotation = 0;   // rotation = 0 bo‘lsin, keyin scale orqali o‘giramiz!
      tex.center.set(0.5, 0.5);

      // HD + sharpening
      tex.generateMipmaps = true; // mipmaps bo‘lsin
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.magFilter = THREE.LinearFilter;

      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // scale bilan aylanadi (180°)
      tex.repeat.set(-1, -1);
    });

    return texture3Img;
    
  };
  const texture3Img = useImages();

  const texture4Img = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/17.jpg"
    );
      
    texture4Img.wrapS = THREE.RepeatWrapping;
    texture4Img.wrapT = THREE.RepeatWrapping;
    texture4Img.rotation = Math.PI / -1;
    texture4Img.repeat.set(4, 1); 

    const texture5Img = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/9.jpg"
    );
      
    texture5Img.wrapS = THREE.RepeatWrapping;
    texture5Img.wrapT = THREE.RepeatWrapping;
    texture5Img.rotation = Math.PI / -2;
    texture5Img.repeat.set(2, 1); 

    const texture6Img = useLoader(
          THREE.TextureLoader,
          process.env.PUBLIC_URL + "/img/18.jpg"
    );
      
    texture6Img.wrapS = THREE.RepeatWrapping;
    texture6Img.wrapT = THREE.RepeatWrapping;
    texture6Img.rotation = Math.PI / -1;
    texture6Img.repeat.set(1, 1); 




    



  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="pillar_left" position={[-8.054, 0, 2.021]} rotation={[0, 1.571, 0]} />
        <mesh
          name="screen1"
          geometry={nodes.screen1.geometry}
          material={materials['screen1.002']}
          position={[0, 0, -4.945]}>


          {/* <mesh
            name="ekran1"
            geometry={nodes.ekran1.geometry}
            
            position={[-2.994, 0.15, 5.01]}
            rotation={[Math.PI, -Math.PI / 6, Math.PI]}
            scale={[1.26, 1.2, 0.6]}
          >
              <meshBasicMaterial
                map={texture1Img}
                toneMapped={false}
              />
          </mesh> */}

          <mesh
            name="ekran1"
            geometry={nodes.ekran1.geometry}
            position={[-2.994, 0.15, 5.01]}
            rotation={[Math.PI, -Math.PI / 6, Math.PI]}
            scale={[1.26, 1.2, 0.6]}

            // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran1: true }));
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran1: false }));
              document.body.style.cursor = "default";
            }}
            onClick={() => handleScreenClick('ekran1')}
          >
            <meshBasicMaterial
              map={texture3Img[1]}
              toneMapped={false}
              color={hoveredScreen.ekran1 ? "gray" : "white"}
            />

          </mesh>

          <mesh
            name="screenLight1"
            geometry={nodes.screenLight1.geometry}
            material={materials['screen-light']}
            position={[-3.006, 0.072, 4.99]}
            rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
            scale={[0.048, 0.009, 1.38]}
          />
        </mesh>
        <mesh
          name="screen2"
          geometry={nodes.screen2.geometry}
          material={materials['screen2.002']}>


          <mesh
            name="ekran2"
            geometry={nodes.ekran2.geometry}
            position={[2.994, 0.15, -4.99]}
            rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
            scale={[1.26, 1.2, 0.6]}

            // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran2: true }));
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran2: false }));
              document.body.style.cursor = "default";
            }}
            onClick={() => handleScreenClick('ekran2')}
          >
            <meshBasicMaterial
              map={texture3Img[18]}
              toneMapped={false}
              color={hoveredScreen.ekran2 ? "gray" : "white"}
            />
          </mesh>
          

          <mesh
            name="screenLight2"
            geometry={nodes.screenLight2.geometry}
            material={materials['screen-light.002']}
            position={[3.009, 0.072, -5.016]}
            rotation={[0, Math.PI / 3, 0]}
            scale={[0.048, 0.009, 1.38]}
          />
        </mesh>
        <group name="pillar_left001" position={[-8.054, 0, -17.92]} rotation={[0, 1.571, 0]} />
        <group name="new-arch003" position={[0, 0, -19.941]} />
        <group name="new-arch005" position={[0, 0, -19.941]}>
          {/* <mesh
            name="floor-reka-chap"
            geometry={nodes['floor-reka-chap'].geometry}
            // material={materials['Material.003']}
            // material={lamp1Material}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>
          <mesh
            name="floor-reka-ung"
            geometry={nodes['floor-reka-ung'].geometry}
            // material={materials['Material.001']}
            // material={lamp1Material}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh> */}
          <mesh
            name="floor-reka-chap"
            geometry={nodes['floor-reka-chap'].geometry}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>

          <mesh
            name="floor-reka-chap"
            geometry={nodes['floor-reka-chap'].geometry} //
            position={[-12.1, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>
          <mesh
            name="floor-reka-chap"
            geometry={nodes['floor-reka-chap'].geometry}
            position={[-12.4, 16.1, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>

          <mesh
            name="floor-reka-ung"
            geometry={nodes['floor-reka-ung'].geometry}
            position={[0, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>

          <mesh
            name="floor-reka-ung"
            geometry={nodes['floor-reka-ung'].geometry} //
            position={[12.1, 0, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>
          <mesh
            name="floor-reka-ung"
            geometry={nodes['floor-reka-ung'].geometry}
            position={[12.4, 16.1, -62.38]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              color={'white'}
            />
          </mesh>


          <mesh
            name="floorr"
            geometry={nodes.floorr.geometry}
            // material={materials['Material.003']}
            position={[0, 0, -62.957]}
            rotation={[0, 0, -Math.PI]}
            scale={[-1, -1, -11.048]}
          >
            <meshBasicMaterial
              // map={videoRef.current}
              // toneMapped={false}
              color={'#222222'}
            />
            {/* <meshBasicMaterial
              map={texture4Img}
            /> */}
              {/* <MeshReflectorMaterial
                blur={[300, 300]}
                resolution={1024}
                mixBlur={0.1}
                mixStrength={1000}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#202020"
                metalness={0.1}
              /> */}
          </mesh>
          <mesh
            name="shifr"
            geometry={nodes.shifr.geometry}
            position={[0, 32.575, -57.139]}
            scale={[-1.466, -1, -11.661]}
            doubleSide={true}
          >
            <meshBasicMaterial
              map={texture5Img}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        {/* O'rta strelka yo'q Start */}
          {/* <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[-0.550, 0.072, 8]}
            rotation={[-Math.PI, Math.PI / 5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[0.550, 0.072, 8]}
            rotation={[-Math.PI, Math.PI / -5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[-0.550, 0.072, -42]}
            rotation={[-Math.PI, Math.PI / 5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[0.550, 0.072, -42]}
            rotation={[-Math.PI, Math.PI / -5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[-0.550, 0.072, -92]}
            rotation={[-Math.PI, Math.PI / 5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[0.550, 0.072, -92]}
            rotation={[-Math.PI, Math.PI / -5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[-0.550, 0.072, -142]}
            rotation={[-Math.PI, Math.PI / 5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          />
          <mesh
            geometry={nodes.screenLight1008.geometry}
            material={lamp1Material}
            position={[0.550, 0.072, -142]}
            rotation={[-Math.PI, Math.PI / -5, -Math.PI]}
            scale={[0.048, 0.009, 0.96]}
          /> */}
          
        {/* O'rta strelka yo'q End */}

        <group name="Empty003" position={[0, 0, -19.941]}>
          <mesh
            name="screen1001"
            geometry={nodes.screen1001.geometry}
            material={materials['screen1.003']}>
            <mesh
              name="ekran3"
              geometry={nodes.ekran3.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredScreen(prev => ({ ...prev, ekran3: true }));
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  setHoveredScreen(prev => ({ ...prev, ekran3: false }));
                  document.body.style.cursor = "default";
                }}
                onClick={() => handleScreenClick('ekran3')}
              >
                <meshBasicMaterial
                  map={texture3Img[3]}
                  toneMapped={false}
                  color={hoveredScreen.ekran3 ? "gray" : "white"}
                />
            </mesh>
            <mesh
              name="screenLight1001"
              geometry={nodes.screenLight1001.geometry}
              material={materials['screen-light.002']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2001"
            geometry={nodes.screen2001.geometry}
            material={materials['screen2.003']}>
            <mesh
              name="ekran4"
              geometry={nodes.ekran4.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran4: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran4: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran4')}
              >
              <meshBasicMaterial
                map={texture3Img[4]}
                toneMapped={false}
                color={hoveredScreen.ekran4 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2001"
              geometry={nodes.screenLight2001.geometry}
              material={materials['screen-light.002']}
              position={[3.009, 0.072, -5.016]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
        </group>
        <mesh
          name="urta-reka"
          geometry={nodes['urta-reka'].geometry}
          // material={materials['floor-whole.005']}
          position={[0, 0.017, -82.92]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.082, -1, -11.048]}
        >
          {/* {video1Texture && (
                <meshBasicMaterial
                map={video1Texture}
                toneMapped={false}
              />)} */}
              <meshBasicMaterial
                color="#444444"
              />

        </mesh>
        <group name="pillar_left004" position={[-8.054, 0, -57.823]} rotation={[0, 1.571, 0]} />
        <group name="pillar_left005" position={[-8.054, 0, -37.882]} rotation={[0, 1.571, 0]} />
        <group name="new-arch008" position={[0, 0, -59.844]} />
        <group name="Empty006" position={[0, 0, -59.844]}>
          <mesh
            name="screen1002"
            geometry={nodes.screen1002.geometry}
            material={materials['screen1.004']}>
            <mesh
              name="ekran7"
              geometry={nodes.ekran7.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran7: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran7: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran7')}
            >
              <meshBasicMaterial
                map={texture3Img[5]}
                toneMapped={false}
                color={hoveredScreen.ekran7 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1002"
              geometry={nodes.screenLight1002.geometry}
              material={materials['screen-light.003']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2002"
            geometry={nodes.screen2002.geometry}
            material={materials['screen2.004']}>
            <mesh
              name="ekran8"
              geometry={nodes.ekran8.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran8: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran8: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran8')}
            >
              <meshBasicMaterial
                map={texture3Img[6]}
                toneMapped={false}
                color={hoveredScreen.ekran8 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2002"
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
            geometry={nodes.screen1003.geometry}
            material={materials['screen1.005']}>
            <mesh
              name="ekran5"
              geometry={nodes.ekran5.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran5: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran5: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran5')}
            >
              <meshBasicMaterial
                map={texture3Img[7]}
                toneMapped={false}
                color={hoveredScreen.ekran5 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1003"
              geometry={nodes.screenLight1003.geometry}
              material={materials['screen-light.004']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2003"
            geometry={nodes.screen2003.geometry}
            material={materials['screen2.005']}>
            <mesh
              name="ekran6"
              geometry={nodes.ekran6.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran6: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran6: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran6')}
            >
              <meshBasicMaterial
                map={texture3Img[8]}
                toneMapped={false}
                color={hoveredScreen.ekran6 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2003"
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
            geometry={nodes.screen1004.geometry}
            material={materials['screen1.006']}>
            <mesh
              name="ekran13"
              geometry={nodes.ekran13.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran13: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran13: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran13')}
            >
              <meshBasicMaterial
                map={texture3Img[9]}
                toneMapped={false}
                color={hoveredScreen.ekran13 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1004"
              geometry={nodes.screenLight1004.geometry}
              material={materials['screen-light.005']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2004"
            geometry={nodes.screen2004.geometry}
            material={materials['screen2.006']}>
            <mesh
              name="ekran14"
              geometry={nodes.ekran14.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran14: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran14: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran14')}
            >
              <meshBasicMaterial
                map={texture3Img[10]}
                toneMapped={false}
                color={hoveredScreen.ekran14 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2004"
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
            geometry={nodes.screen1005.geometry}
            material={materials['screen1.007']}>
            <mesh
              name="ekran15"
              geometry={nodes.ekran15.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran15: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran15: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran15')}
            >
              <meshBasicMaterial
                map={texture3Img[11]}
                toneMapped={false}
                color={hoveredScreen.ekran15 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1005"
              geometry={nodes.screenLight1005.geometry}
              material={materials['screen-light.006']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2005"
            geometry={nodes.screen2005.geometry}
            material={materials['screen2.007']}>
            <mesh
              name="ekran16"
              geometry={nodes.ekran16.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran16: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran16: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran16')}
            >
              <meshBasicMaterial
                map={texture3Img[12]}
                toneMapped={false}
                color={hoveredScreen.ekran16 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2005"
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
            geometry={nodes.screen1006.geometry}
            material={materials['screen1.008']}>
            <mesh
              name="ekran11"
              geometry={nodes.ekran11.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
                
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran11: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran11: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran11')}
            >
              <meshBasicMaterial
                map={texture3Img[13]}
                toneMapped={false}
                color={hoveredScreen.ekran11 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1006"
              geometry={nodes.screenLight1006.geometry}
              material={materials['screen-light.007']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2006"
            geometry={nodes.screen2006.geometry}
            material={materials['screen2.008']}>
            <mesh
              name="ekran12"
              geometry={nodes.ekran12.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran12: true }));
              document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  setHoveredScreen(prev => ({ ...prev, ekran12: false }));
                  document.body.style.cursor = "default";
                }}
                onClick={() => handleScreenClick('ekran12')}
              >
                <meshBasicMaterial
                  map={texture3Img[14]}
                  toneMapped={false}
                  color={hoveredScreen.ekran12 ? "gray" : "white"}
                />
            </mesh>
            <mesh
              name="screenLight2006"
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
            geometry={nodes.screen1007.geometry}
            material={materials['screen1.009']}>
            <mesh
              name="ekran9"
              geometry={nodes.ekran9.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran9: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran9: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran9')}
            >
              <meshBasicMaterial
                map={texture3Img[15]}
                toneMapped={false}
                color={hoveredScreen.ekran9 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1007"
              geometry={nodes.screenLight1007.geometry}
              material={materials['screen-light.008']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2007"
            geometry={nodes.screen2007.geometry}
            material={materials['screen2.009']}>
            <mesh
              name="ekran10"
              geometry={nodes.ekran10.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran10: true }));
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran10: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran10')}
            >
              <meshBasicMaterial
                map={texture3Img[16]}
                toneMapped={false}
                color={hoveredScreen.ekran10 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2007"
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
            geometry={nodes.screen1009.geometry}
            material={materials['screen1.010']}>
            <mesh
              name="ekran17"
              geometry={nodes.ekran17.geometry}
              
              position={[-2.994, 0.15, 5.01]}
              rotation={[Math.PI, -Math.PI / 6, Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran17: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran17: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran17')}
            >
              <meshBasicMaterial
                map={texture3Img[17]}
                toneMapped={false}
                color={hoveredScreen.ekran17 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight1009"
              geometry={nodes.screenLight1009.geometry}
              material={materials['screen-light.009']}
              position={[-3.006, 0.072, 4.99]}
              rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
              scale={[0.048, 0.009, 1.38]}
            />
          </mesh>
          <mesh
            name="screen2009"
            geometry={nodes.screen2009.geometry}
            material={materials['screen2.010']}>
            <mesh
              name="ekran18"
              geometry={nodes.ekran18.geometry}
              
              position={[2.994, 0.15, -4.99]}
              rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
              scale={[1.26, 1.2, 0.6]}
              // O'zgartirildi: onClick handleScreenClick ga o'zgartirildi
              onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredScreen(prev => ({ ...prev, ekran18: true }));
              document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredScreen(prev => ({ ...prev, ekran18: false }));
                document.body.style.cursor = "default";
              }}
              onClick={() => handleScreenClick('ekran18')}
            >
              <meshBasicMaterial
                map={texture3Img[0]}
                toneMapped={false}
                color={hoveredScreen.ekran18 ? "gray" : "white"}
              />
            </mesh>
            <mesh
              name="screenLight2009"
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
          geometry={nodes['wall-right'].geometry}
          position={[-13.6, 8.092, -84.928]}
          rotation={[0, 0, -1.561]}
          scale={[8.268, 1, 106.705]}
        >
          {/* {video2Texture && (
            <meshBasicMaterial
            map={video2Texture}
            toneMapped={false}
          />)} */}
          {/* <meshBasicMaterial
                color="#222222"
              /> */}
              <meshBasicMaterial
                map={texture2Img}
              />
        </mesh>
        <mesh
          name="devor-oxiri"
          geometry={nodes['devor-oxiri'].geometry}
          // material={materials['Material.001']}
          position={[-0.043, 8.158, -191.448]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[-13.916, -1, -8.294]}
        >
          {/* {video1Texture && (
            <meshBasicMaterial
            map={video1Texture}
            toneMapped={false}
          />)} */}
          <meshBasicMaterial
            map={texture6Img}
          />
        </mesh>
        <mesh
          name="wall-left"
          geometry={nodes['wall-left'].geometry}
          position={[13.6, 8.092, -84.928]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[8.268, 1, 106.705]}
        >
          {/* {video2Texture && (
            <meshBasicMaterial
            map={video2Texture}
            toneMapped={false}
          />)} */}
          {/* <meshBasicMaterial
                color="#222222"
              /> */}
              <meshBasicMaterial
                map={texture2Img}
              />
        </mesh>
        <mesh
          name="Screen"
          geometry={nodes.Screen.geometry}
          position={[-0.009, 3.982, -179.999]}
          scale={2.571}
        >
          {video1Texture && (
            <meshBasicMaterial
            map={video1Texture}
          />)}
          
        </mesh>
        <group name="Empty001" position={[0, 0, -40]}>
          <mesh
            name="light-1-cover002"
            geometry={nodes['light-1-cover002'].geometry}
            material={materials['light2-cover.003']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner002"
            geometry={nodes['light-1-inner002'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover002"
            geometry={nodes['light-2-cover002'].geometry}
            material={materials['light2-cover.002']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner002"
            geometry={nodes['light-2-inner002'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover002"
            geometry={nodes['light-3-cover002'].geometry}
            material={materials['light2-cover.001']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner002"
            geometry={nodes['light-3-inner002'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty008" position={[0, 0, -74.071]}>
          <mesh
            name="light-1-cover004"
            geometry={nodes['light-1-cover004'].geometry}
            material={materials['light2-cover.009']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner004"
            geometry={nodes['light-1-inner004'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover004"
            geometry={nodes['light-2-cover004'].geometry}
            material={materials['light2-cover.008']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner004"
            geometry={nodes['light-2-inner004'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover004"
            geometry={nodes['light-3-cover004'].geometry}
            material={materials['light2-cover.007']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner004"
            geometry={nodes['light-3-inner004'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty012" position={[0, 0, -113.243]}>
          <mesh
            name="light-1-cover006"
            geometry={nodes['light-1-cover006'].geometry}
            material={materials['light2-cover.018']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner006"
            geometry={nodes['light-1-inner006'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover006"
            geometry={nodes['light-2-cover006'].geometry}
            material={materials['light2-cover.017']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner006"
            geometry={nodes['light-2-inner006'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover006"
            geometry={nodes['light-3-cover006'].geometry}
            material={materials['light2-cover.016']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner006"
            geometry={nodes['light-3-inner006'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty016" position={[0, 0, -153.316]}>
          <mesh
            name="light-1-cover008"
            geometry={nodes['light-1-cover008'].geometry}
            material={materials['light2-cover.024']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner008"
            geometry={nodes['light-1-inner008'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover008"
            geometry={nodes['light-2-cover008'].geometry}
            material={materials['light2-cover.023']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner008"
            geometry={nodes['light-2-inner008'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover008"
            geometry={nodes['light-3-cover008'].geometry}
            material={materials['light2-cover.022']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner008"
            geometry={nodes['light-3-inner008'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty018" position={[0, 0, -192.145]}>
          <mesh
            name="light-1-cover010"
            geometry={nodes['light-1-cover010'].geometry}
            material={materials['light2-cover.030']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner010"
            geometry={nodes['light-1-inner010'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover010"
            geometry={nodes['light-2-cover010'].geometry}
            material={materials['light2-cover.029']}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-2-inner010"
            geometry={nodes['light-2-inner010'].geometry}
            material={lampMaterial}
            position={[-0.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-cover010"
            geometry={nodes['light-3-cover010'].geometry}
            material={materials['light2-cover.028']}
            position={[-2.984, -14.998, 48.266]}
          />
          <mesh
            name="light-3-inner010"
            geometry={nodes['light-3-inner010'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty019" position={[0, 0, -211.891]}>
          <mesh
            name="light-1-cover011"
            geometry={nodes['light-1-cover011'].geometry}
            material={materials['light2-cover.033']}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-1-inner011"
            geometry={nodes['light-1-inner011'].geometry}
            material={lampMaterial}
            position={[1.016, -14.998, 48.266]}
          />
          <mesh
            name="light-2-cover011"
            geometry={nodes['light-2-cover011'].geometry}
            material={materials['light2-cover.032']}
            position={[-0.984, -16.644, 48.266]}
          />
          <mesh
            name="light-2-inner011"
            geometry={nodes['light-2-inner011'].geometry}
            material={lampMaterial}
            position={[-0.984, -16.644, 48.266]}
          />
          <mesh
            name="light-3-cover011"
            geometry={nodes['light-3-cover011'].geometry}
            material={materials['light2-cover.031']}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
        <group name="Empty020" position={[0, 0, -211.942]}>
          <mesh
            name="light-3-inner012"
            geometry={nodes['light-3-inner012'].geometry}
            material={lampMaterial}
            position={[-2.984, -14.998, 48.266]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model3.glb')
