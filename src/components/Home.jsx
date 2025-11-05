  import React from 'react';
import AboutSection from './HomeComponents/AboutSection';
import ProductsSection from './HomeComponents/ProductsSection';
import Slider from './HomeComponents/Slider';



function Home() {
  document.title = "Lotus Implex | Global Quality Deivered"
  return (
    <div>
    
      <div class="it-slider-3-area p-relative fix">
     {/* <Slider/> */}
     <AboutSection />
     
     <ProductsSection />
     
      {/* Other components */}

      </div>

    </div>
  );
}

export default Home;
