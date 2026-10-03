import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopHeader from './components/TopHeader'
import HeaderMain from './components/HeaderMain'

// import AboutSection from './components/HomeComponents/AboutSection'
// import ProductsSection from './components/HomeComponents/ProductsSection'
import Footer from './components/Footer'
// import Home from './components/Home'
// import About from './components/About'
// import SolarPanels from './components/SolarPanels'
import Contact from './components/Contact'

const App = () => {
  return (
    <BrowserRouter>


    
    <HeaderMain/>
    <Routes>
      {/* <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/solarpanels" element={<SolarPanels />} /> */}
         
       <Route path="/" element={<Contact />} />
    </Routes>



 <Footer />

    </BrowserRouter>
  )
}

export default App