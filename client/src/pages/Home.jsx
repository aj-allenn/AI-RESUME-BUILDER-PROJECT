import React from 'react'
import Navbar from '../components/home/Navbar.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import Testimonial from '../components/home/Testimonial.jsx'
import Contact from '../components/home/Contact.jsx'
import Footer from '../components/home/Footer.jsx'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <Testimonial/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
