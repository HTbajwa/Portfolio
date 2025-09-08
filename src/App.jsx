import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
       <div className='pt-10  pb-10'>
<Footer />
</div> 
    </main>
  );
};

export default App;
