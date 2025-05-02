import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Customer1 from '../images/Customer1.png';
import Customer2 from '../images/Customer2.png';
import Customer3 from '../images/Customer3.png';
import Customer4 from '../images/Customer4.png';
import Customer5 from '../images/Customer5.png';

const Home = () => {
  const customerLogos = [
    { id: 1, src: Customer1, alt: "Customer 1", caption: "Kaleem Jewellers" },
    { id: 2, src: Customer2, alt: "Customer 2", caption: "Rmk School" },
    { id: 3, src: Customer3, alt: "Customer 3", caption: "Sindhi School" },
    { id: 4, src: Customer4, alt: "Customer 4", caption: "Spartan School" },
    { id: 5, src: Customer5, alt: "Customer 5", caption: "Velammal Vidyalaya" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Number of logos to show at once
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % (customerLogos.length - slidesToShow + 1));
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [customerLogos.length]);
  
  // Manual navigation
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? customerLogos.length - slidesToShow : prevSlide - 1);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % (customerLogos.length - slidesToShow + 1));
  };
  
  return (
    <div className="home-container">
      <h2 className='TopH1'>NewsPaper that reaches every DoorStep</h2>
      <div className="TextContainer">
        <p className="text-paragraph">
          Successfully running for over a decade, our newspaper not only brings the latest and most reliable news to every doorstep in <b>Avadi</b> and <b>Poonamalleee</b> but also serves as a powerful platform for local and national advertisements. We help businesses grow by connecting them with a wide and engaged audience.
        </p>
      </div>

      <div className="customers">
        <h1>Our Customers for the past years</h1>
        <div className="customer-slider-container">
          <button className="slider-nav prev-button" onClick={goToPrevSlide}>
            &lt;
          </button>
          
          <div className="customer-slider">
            {customerLogos.slice(currentSlide, currentSlide + slidesToShow).map((logo) => (
              <div key={logo.id} className="logo-slide">
                <figure>
                  <img src={logo.src} alt={logo.alt} />
                  <figcaption>{logo.caption}</figcaption>
                </figure>
              </div>
            ))}
          </div>
          
          <button className="slider-nav next-button" onClick={goToNextSlide}>
            &gt;
          </button>
        </div>
        
        <div className="slider-dots">
          {Array.from({ length: customerLogos.length - slidesToShow + 1 }).map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;