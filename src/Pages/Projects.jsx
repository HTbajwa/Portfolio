import React, { useRef, useState } from 'react'
import Footer from '../Components/Footer';
import { cards } from '../data.jsx'

const Projects = () => {
  const [filter, setfilter] = useState('All')
  

const handlechange=(e)=>{
  setfilter(e)

}
const filtercards=cards.filter((card)=>{
if(filter=='All') return true;
return card.tags.includes(filter)
}

)

  return (
    <section className='max-container'>
<div>
 <h1 className='head-text'>
 My  <span className='blue-gradient_text'>Projects</span>
 </h1>
 <p className='pt-4 text-justify'>
 As a passionate learner I've been learning something new and push past my limit. As a result, I have created some projects but this is just the beginning.
 </p>
 </div>
<div>
<div className='flex gap-4 pt-10 justify-center items-center'>
        <button className='btn1' onClick={()=>handlechange('All')}>All</button>
        <button className='btn1'  onClick={()=>handlechange('Best')}>MERN Stack Project</button>
        <button className='btn1'  onClick={()=>handlechange('Static')}>React Project</button>
       
      </div>
   
</div>
<div className='pt-10' >

  <div className='grid md:grid-cols-3 grid-cols-1 gap-20 '>
   
   {
    filtercards.map((card,i)=>(
<div className='bg-white p-4 rounded-md md:w-full  ' key={i}>
      <img src={card.image} alt="" className='rounded-md md:w-full' />
      <div className='  flex items-center justify-center '>
        <button  className={`${card.tags=='Best' && 'Dynamic' ? 'btn3 -mt-6' :'btn2  -mt-6 '}`}>
         <a target='_blank' href={card.liveLink}  rel="noopener noreferrer">
         {card.tags}
         </a>
        </button>
      </div>
      <div className='pt-4'>
      <h1 className='text-center font-bold text-[16px]'>{card.title}</h1>
      </div>
      <p className='text-justify pt-4 text-[13px]'>
        {card.description}
      </p>
      
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

export default Projects