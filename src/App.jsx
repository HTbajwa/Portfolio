import React from 'react'
import {Route,BrowserRouter, Routes} from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
const App = () => {
  return (
   <main className='bg-slate-300/20'>
<BrowserRouter>
<Navbar />
<Routes>
<Route path='/' element={< Home/>}   />
<Route path='/about' element={< About/>  }  />
<Route path='/project' element={< Projects/> }   />
<Route path='/contact' element={< Contact/>  } />
</Routes>

</BrowserRouter>
   </main>
  )
}

export default App