import React from 'react'
import { ReactTyped } from 'react-typed'
import About from "./About"
import Projects from "./Projects"
import { NavLink } from 'react-router-dom'
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa"
import { motion } from 'framer-motion'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <section className='max-container flex flex-col'>

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

<div className='flex gap-4'>
         <NavLink to={'/project'} className='btn3 '>
            View Projects
          </NavLink>
          <NavLink to={'/contact'} className='btn1'>
            Hire me
          </NavLink>
          
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
{/* <div>
  <About />
  <Projects />
</div> */}
<div className='pt-10 pb-10'>
<Footer />
</div>

    </section>
  )
}

export default Home