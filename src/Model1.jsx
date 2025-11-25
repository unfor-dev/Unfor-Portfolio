import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model1(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/model1.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions[Object.keys(actions)[0]]
    if (action) {
      action.play()
      action.timeScale = 0.5
    }
  }, [actions])




  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene" >
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.017}>
          <group name="e779cecba394439eb4f3b40699d8d016fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_6"
                    geometry={nodes.Object_6.geometry}
                    material={materials.Ch44_Body}
                    skeleton={nodes.Object_6.skeleton}
                  />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Ch44_body1}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Ch44" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model1.glb')
