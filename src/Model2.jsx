import { useGLTF } from '@react-three/drei'

export default function Model2(props) {
  const { nodes, materials } = useGLTF('/model2.glb')
  

  return (
    <group {...props} dispose={null} position={[0, -1.5, 3.5]} rotation={[0, 4.71, 0]}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Ecran_6" position={[0.121, 0.007, 0]}>
                <group name="Charniere_5">
                  <mesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.MacBookPro}
                  />
                </group>
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.MacBookPro}
                >
                </mesh>
              </group>
              <group name="MacBook_Body_2">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.MacBookPro}
                  // position={[0, -0.019, 0]}
                  // rotation={[0, 0, 0.15]}
                >
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model2.glb')
