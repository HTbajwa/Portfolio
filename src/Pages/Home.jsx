import React from 'react'
import { ReactTyped } from 'react-typed'
import About from "./About"
import Projects from "./Projects"
import avater from "../assets/images/avater.webp"

import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa"
import { motion } from 'framer-motion'
import Footer from '../Components/Footer'
import Contact from './Contact'
const Home = () => {
  return (
    <section id='home' className='max-container1  items-center flex flex-col'>
<div className='flex items-center flex-col '>
  <div className="w-56 h-56 p-[2px] bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-[0_0_18px_2px_rgba(0,198,255,0.45)] flex items-center justify-center overflow-hidden">
  <img src={avater} alt="" className="w-full h-full object-cover rounded-full" />
</div>
<div>
   <div className=''>
                     

          <h1 className='head-text'>Hello, I'm   </h1>


          </div>
          <h1 className='blue-gradient_text head-text'>
              <ReactTyped strings={["Hadia Tariq","Web Developer","ReactJS Developer"]}
              typeSpeed={40} backSpeed={50} loop />
            </h1>
       
      <br />

         <div>
          <p>
          A React Developer who loves turning designs into fast, functional web applications.
          
          </p>
          <br />
         </div>
</div>



</div>
        


<div className='flex   gap-4'>
 
         <a href='#project' className='btn3 '>
            View Projects
          </a>
          <a href='#contact' className='btn1'>
            Hire me
          </a>
          
     <span className='border-l-2 lg:flex hidden'></span>
        


<div className='md:flex hidden gap-2'>
  <motion.div className='border-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer hover:text-white'
  
  
  whileHover={{ scale: 1.1, rotate: 2 }}
  whileTap={{ scale: 0.95 }}
  
  >
  <a
        href="https://github.com/HTbajwa"
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <FaGithub />
      </a>
  </motion.div>


<motion.div className='border-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer hover:text-white'
whileHover={{ scale: 1.1, rotate: 2 }}
whileTap={{ scale: 0.95 }}
>
<a href="https://www.linkedin.com/in/hadia-tariq-738624287/"
      target='_blank'
      rel="noopener noreferrer"

      
      >
      <FaLinkedin />
      </a>
</motion.div>
      
</div>
</div>


    </section>
  )
}

export default Home