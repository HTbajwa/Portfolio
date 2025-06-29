import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <section>
        <hr />
        <div className='flex md:flex-row pt-10 justify-between flex-col '>

        <div >
<h1 className='md:text-3xl text-xl font-extrabold'>Have a project in mind?</h1>
<h1 className='md:text-3xl text-xl font-extrabold'>Let's build something together!</h1>
</div>
<div  className=" md:pt-0 pt-8">
<button

        className="btn "
        ><Link to={"/contact"}>Contact me</Link></button>


</div>

      

        </div>
       

       
       
        </section>
  )
}

export default Footer