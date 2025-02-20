import React, { useEffect } from 'react'
import Contact from '../components/Contact'

const ContactPage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Contact/>
  )
}

export default ContactPage