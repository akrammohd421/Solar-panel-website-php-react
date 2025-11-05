import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css';
import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/css/animate.css';
import './assets/css/custom-animation.css';
import './assets/css/slick.css';
import './assets/css/nice-select.css';
import './assets/css/swiper-bundle.css';
import './assets/css/flaticon_solvra.css';
import './assets/css/font-awesome-pro.css';
import './assets/css/magnific-popup.css';
import './assets/css/spacing.css';
import './assets/css/style.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



import App from './App.jsx' 


createRoot(document.getElementById('root')).render(                                                       
  <StrictMode>
    <App />
  </StrictMode>,
)
