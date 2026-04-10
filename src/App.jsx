import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import Portfolio from './Pages/dummy';

const App = () => {
  return (
    <main className=''>
      {/* <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact /> */}
      <Portfolio />
       {/* <div className='pt-10  pb-10'>
<Footer />
</div>  */}
    </main>
  );
};

export default App;
