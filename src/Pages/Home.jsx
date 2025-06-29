import React, { Suspense, useEffect, useRef, useState } from 'react'
import {Canvas} from "@react-three/fiber"
import Loader from '../Components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import Homeinfo from '../Components/Homeinfo'
import { soundoff, soundon } from "../assets/icons";
import sakura from "../assets/sakura.mp3"
import About from './About'

const Home = () => {
const audioref=useRef(new Audio(sakura))
audioref.current.loop=true
audioref.current.volume=0.4
const [isplaying, setisplaying] = useState(false)
useEffect(() => {
 if(isplaying)
 {
    audioref.current.play()
 }
 return()=>{
    audioref.current.pause()
 }
  }
, [isplaying])

const [currentStage, setCurrentStage] = useState(1);
const[isRotating,setisRotating]=useState(false)
const adjustIslandForScreenSize=()=>{
    let screenscale=null;
    let screenposition=[ 0,-6.5,-43]
    let rotation=[0.1,4.7,0]
   if(window.innerWidth < 768)
{
    screenscale=[0.9,0.9,0.9]
   
}
else
{
    screenscale=[1,1,1]
   
}

return[screenscale,screenposition,rotation]
}

const [islandScale,islandPosition,islandrotation]=adjustIslandForScreenSize();



const adjustPlaneForScreenSize=()=>{
   let screenscale,screenposition;
   if(window.innerWidth < 768)
{
    screenscale=[1.5,1.5,1.5]
    screenposition=[0,-1.5,0]
   
}
else
{
    screenscale=[3,3,3]
    screenposition=[0,-4,-4]
   
}



return[screenscale,screenposition]
}
const [planeScale,planePosition]=adjustPlaneForScreenSize();


  return (
   <section className='relative w-full h-screen'>
    
    <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <Homeinfo currentStage={currentStage} />}
      </div>
    
    
    <Canvas className={`bg-transparent w-full h-screen ${isRotating ? "cursor-grabbing " : "cursor-grab"}`} 

camera={{near:0.1, far:1000}}
>
<Suspense fallback={<Loader />}>

<directionalLight position={[1,1,1]} intensity={2} />
<ambientLight intensity={0.5}/>



<hemisphereLight skyColor="#b1e1ff" intensity={1} groundColor="#000000"/>
<Bird 
isRotating={isRotating}


/>
<Sky isRotating={isRotating} />

<Island position={islandPosition}

scale={islandScale}
rotation={[0.1, 4.7077, 0]}
isRotating={isRotating}
setisRotating={setisRotating}
setCurrentStage={setCurrentStage}
/>



<Plane 
isRotating={isRotating}
scale={planeScale}
position={planePosition}
rotation={[0,20,0]}
/>







</Suspense>
</Canvas>
<div className='absolute bottom-2 left-2'>
        <img
          src={!isplaying ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setisplaying(!isplaying)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
        <div>
       

        </div>
        
      </div>
      <About />
   </section>
  )
}

export default Home