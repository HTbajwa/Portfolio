import React from 'react'
import { ReactTyped } from "react-typed";
import { Experience, Skills } from '../data';
import {motion} from 'framer-motion'

import Footer from '../Components/Footer';
const About = () => {
  return (
<section className='max-container'>
<div>
 <h1 className='head-text'>
   About me
 </h1>

 <div className='pt-4  text-justify '>

  <div className='border-l-2 pl-4 p-4 border-blue-500 bg-gradient-to-r from-blue-200 to-white shadow-md rounded-md '>


I’m <strong>Hadia Tariq</strong>, a self-motivated web developer with a strong focus on building responsive, user-friendly applications using the <strong>MERN stack</strong>. My journey began with a curiosity for how websites work and quickly grew into a passion for crafting full-stack projects that are both functional and beautifully designed.

<br />

With hands-on experience in React, Node.js, Express, and MongoDB, I’ve built real-world applications that emphasize clean code, smooth UI, and performance. I’ve completed certifications in modern web technologies and continue to expand my skills every day. Whether I’m building an e-commerce store, designing reusable components, or learning new tools, I aim to create solutions that leave a lasting impact.
</div>

  </div>

<h1 className='pt-8 font-bold md:text-4xl text-2xl'>
My Skills
</h1>
<div className='w-full overflow-hidden'>
<motion.div className='flex w-max gap-7'
initial={{x:"0%"}}
animate={{x:["0%","-50%"]}}
transition={{repeat:Infinity,duration:10,ease:'linear'}}





>
  {[...Array(2)].map((_,index)=>(
    <div className='flex gap-7' key={index}>
{
  Skills.map((sk,i)=>(
  <div key={i}>
  <div className="rounded-full p-4 w-[100px] mt-8 flex items-center justify-center cursor-pointer"
  style={{ backgroundColor: sk.bgColor }}
  >
  <div className='flex items-center justify-center'> 
<img src={sk.icon} alt="" className='w-[100px] h-[50px] '/>
    
  </div>
  
</div>
<div className=' font-bold flex items-center justify-center '>{sk.text}</div> 
  </div>

  ))
}
</div>
  ))}

</motion.div>
</div>

<h1 className='pt-20 font-bold md:text-4xl text-xl text-center'>
I Know That
<span className='blue-gradient_text pl-2'>
Good Design
  </span> 

</h1>
<h1 className='pt-2 font-bold md:text-4xl text-xl text-center'>
Means

<span className='blue-gradient_text pl-2'>
Good Business
</span>
</h1>



<div className='grid grid-cols-1 gap-7  md:grid-cols-4 pt-10'>
{/* <div>
<div className="rounded-full  w-full mt-8 flex items-center justify-center cursor-pointer bg-black-500">

<div className='flex w-full '> 
<img src={webdesigner} alt="" className=' w-full   rounded-md ' />
    
  </div>
 
</div>
<div className=' font-bold flex items-center justify-center pt-4 pb-4 '>
<h1>
Web Developer
</h1>
  </div> 

  <div className=' flex items-center justify-center text-sm text-justify '>
<p>
Began coding with HTML and CSS, gradually delving into JavaScript. My React portfolio reflects both my journey and evolving expertise.
</p>
  </div> 
  </div> */}


{
  Experience.map((exp,i)=>(
<div key={i}>
<div className="rounded-full  w-full mt-8 flex items-center justify-center cursor-pointer bg-black-500">

<div className='flex w-full '> 
<img src={exp.image} alt="" className=' w-full   rounded-md ' />
    
  </div>
 
</div>
<div className=' font-bold flex items-center justify-center pt-4 pb-4 '>
<h1>
{exp.text}
</h1>
  </div> 

  <div className=' flex items-center justify-center text-sm text-justify '>
<p>
{exp.paragraph}
</p>
  </div> 
  </div>



  ))
}







</div>


</div>
<div className='pt-10 pb-10'>
<Footer />
</div>

</section>
  )
}

export default About