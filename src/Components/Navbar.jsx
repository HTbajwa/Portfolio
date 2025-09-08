import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";

import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [active, setactive] = useState("Home")
  const [open, setopen] = useState(false)
const navitems=[
  "Home",
  "About",
  "Project",
  "Contact"
]
  return (
    <section>
    <nav className='fixed top-3 inset-x-0 flex justify-center z-50'>

      <div className='bg-gradient-to-r  from-[#00c6ff] to-[#0072ff] p-[2px] rounded-full shadow-[0_0_18px_2px_rgba(0,198,255,0.45)]'>

<div className='flex items-center px-5 py-3 md:px-10 gap-x-48 justify-between bg-white rounded-full'>
      <a href='#Home' className="w-10 h-10 rounded-lg bg-white items-center 

flex justify-center font-bold shadow-md
">
<p className='blue-gradient_text'>HT</p>

</a>
<nav className='md:flex text-lg gap-7 hidden font-medium'>

<ul className='md:flex hidden gap-6'>
{
  navitems.map((items)=>
  <li key={items} className='relative'>
    <a
        href={`#${items.toLowerCase()}`}
  onClick={(e) => {
    
    setactive(items)}}
className={`${active===items ?"text-blue-500" : "text-black" } hover:text-blue-500`}
    
    >{items}</a>
{
  active===items &&(
    <span className="absolute bg-blue-500 -translate-x-1/2 w-1 h-1 mt-[2px] left-1/2 top-full rounded-full"></span>
  )
}

  </li>)
}
</ul>

</nav>




<a
  href="/ReumeHadia.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className="btn hidden lg:flex"
>
  Download CV
</a>



<button className="md:hidden ml-2 text-blue-500 cursor-pointer btn1" onClick={()=>setopen(true)}>
            <FiMenu size={22} />
          </button>

  
</div>




      </div>
  
     
    </nav>
  
    <div className={`${open ? "flex" : "hidden"} fixed top-0 left-0 z-50 h-full w-[50%] bg-white-500 opacity-90 backdrop-blur-md transition-transform duration-300 justify-center items-center`}>

<div className="relative h-full w-full flex flex-col justify-center items-center">


  <button className="absolute cursor-pointer btn1 top-4 right-10 text-white z-50"
            onClick={() => setopen(false)}>
    <MdClose />
    </button>
<div className='mt-24 flex flex-col items-center justify-between space-y-8 text-lg font-semibold px-6 '>

<ul className='w-full h-screen flex flex-col items-center mt-24 z-40 gap-8'>
{
  navitems.map((items)=>
  <li key={items} className='relative'>
    <a
      href={`#${items.toLowerCase()}`}
  onClick={(e) => {
    
    setactive(items)
    setopen(false)
  }}
className={`${active===items ?"text-blue-500" : "text-black" } hover:text-blue-500`}
    
    >{items}</a>
{
  active===items &&(
    <span className="absolute bg-blue-500 -translate-x-1/2 w-1 h-1 mt-[2px] left-1/2 top-full rounded-full"></span>
  )
}

  </li>)
}
<a
  href="/ReumeHadia.pdf"
  download
  target="_blank"
  rel="noopener noreferrer"
  className='btn'
 
>
  Download CV
</a>

</ul>


</div>

</div>
</div>
  

  
  </section>
   
  )
}

export default Navbar
