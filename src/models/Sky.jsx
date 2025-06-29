import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import skyScene from "../assets/3d/sky.glb"
import { useFrame } from '@react-three/fiber'
const Sky = ({isRotating}) => {
    const sky=useGLTF(skyScene)
    const skref=useRef();
    useFrame((_,delta)=>{
  if(isRotating)
  {
    skref.current.rotation.y+=0.15 * delta
  }
    })
  return (
    <mesh ref={skref}>
<primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky