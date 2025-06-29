import React from 'react'
import { ReactTyped } from "react-typed";
import { Experience, Skills } from '../data';

import Footer from '../Components/Footer';
const About = () => {
  return (
<section className='max-container'>
<div>
 <h1 className='head-text'>
 Hello, I'm <span className='blue-gradient_text'>
 
 <ReactTyped strings={["Hadia"]} typeSpeed={40}
 backSpeed={50}
 loop
 />
 </span>
 </h1>
 <p className='pt-4'>
 A passionate web developer with a strong background in creating dynamic and responsive websites.
 </p>
<h1 className='pt-8 font-bold md:text-4xl text-2xl'>
My Skills
</h1>






<div className='grid grid-cols-2 gap-7  md:grid-cols-7'>
{
  Skills.map((sk,i)=>(
  <div key={i}>
  <div className="rounded-full p-4 w-[100px] mt-8 flex items-center justify-center cursor-pointer"
  style={{ backgroundColor: sk.bgColor }}
  >
  <div className='flex items-center justify-center'> 
<img src={sk.icon} alt="" className='w-[50px] h-[50px] '/>
    
  </div>
  
</div>
<div className=' font-bold flex items-center justify-center '>{sk.text}</div> 
  </div>

  ))
}

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