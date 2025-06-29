import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import {Canvas} from "@react-three/fiber"
import { Fox } from '../models/fox';
import { Loader } from '@react-three/drei';
import useAlert from '../Hooks/useAlert';
import Alert from '../Components/Alert';

const Contact = () => {
  const formref=useRef(null)
  const [form, setform] = useState({name:"",email:"",message:""})
  const [Loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const {alert,showAlert,hideAlert}=useAlert()
  const handleonChange=(e)=>{
setform({...form,[e.target.name]:e.target.value})

  }
  const handlefocus=()=>setCurrentAnimation("walk");
  const handleblur=()=>setCurrentAnimation("idle");
 const handleSubmit=(e)=>{
e.preventDefault();
setCurrentAnimation("hit");

setLoading(true)
emailjs.send(
  import.meta.env.VITE_EMAIL_ADDRESS_ID,
    import.meta.env.VITE_TEMPLATE_ID,
  
  {
form_name:form.name,
to_name:"Hadia",
form_email:form.email,
to_email:"tariqhadia12@gmail.com",
message:form.message
  },
  import.meta.env.VITE_PUBLIC_KEY
  
)
.then((response) => {
  console.log('SUCCESS!', response);
  setLoading(false);

  // Reset form and animation state after a delay
  setTimeout(() => {
    setform({
      name: "",
      email: "",
      message: "",
    });
    setCurrentAnimation("idle");
  }, 3000);

  showAlert({
    show: true,
    text: "Thank you for your message 😃",
    type: "success",
  });




})
.catch((error) => {
  console.error('FAILED...', error);
  setCurrentAnimation("idle");
  setLoading(false);
  showAlert({
    show: true,
    text: "I didn't receive your message 😢",
    type: "danger",
  });
});
 }
  return (
    <section className='relative flex md:flex-row flex-col max-container'>

    {alert.show && <Alert {...alert} />}


<div className='flex flex-col min-w-[50%] flex-1'>
  <h1 className='head-text'>Get in touch</h1>

 <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit} ref={formref}>
 <label className='text-black-500 font-semibold'>
  Name
  <input
    type="text"
    name='name'
    className='input'
    required
    placeholder='Write your name'
    value={form.name}
    onChange={handleonChange}
    onBlur={handleblur}
    onFocus={handlefocus}
  />
</label>

<label className='text-black-500 font-semibold'>
Email
  <input
    type="email"
    name='email'
    className='input'
    required
    placeholder='Write your Email Address'
    value={form.email}
    onChange={handleonChange}
    onBlur={handleblur}
    onFocus={handlefocus}
  />
</label>

<label className='text-black-500 font-semibold'>
  Message
  <textarea
    
    name='message'
    rows={4}
    className='textarea'
    placeholder='Let me know how can i help you'
    required
    value={form.message}
    onChange={handleonChange}
    onBlur={handleblur}
    onFocus={handlefocus}
  />
</label>

<button className='btn'
type='submit'
onFocus={handlefocus}
onBlur={handleblur}

>
{Loading ? "Sending..." : "Send Message"}
</button>

 </form>




</div>
<div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
<Canvas
camera={{
  position: [0, 0, 5],
  fov: 75,
  near: 0.1,
  far: 1000,
}}
>
  <Suspense fallback={<Loader />}>
  <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
<Fox 

currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
/>
  </Suspense>
</Canvas>
</div>
    </section>
  )
}

export default Contact