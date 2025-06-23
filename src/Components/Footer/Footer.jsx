import React, { useRef } from 'react'
import "./Footer.css"
import logo from "../../assets/logo2.png"
import logoText from "../../assets/logo3.png"
import instagram_icon from "../../assets/instagram.png"
import facebook_icon from "../../assets/facebook.png"
import whatsapp_icon from "../../assets/whatsapp.png"
import { Link, useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  const prodRef = useRef();
  const offRef = useRef();
  const compRef = useRef();
  const contactRef = useRef();
  const instaRef = useRef();
  const fbRef = useRef();
  const waRef = useRef();

  const handleAnimatedNav = (ref) => {
    if (ref.current) {
      ref.current.classList.add('footer-link-animate');
      setTimeout(() => {
        ref.current.classList.remove('footer-link-animate');
        navigate('/');
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    }
  };

  const handleSocialMediaClick = (ref, url) => {
    if (ref.current) {
      ref.current.classList.add('footer-link-animate');
      setTimeout(() => {
        ref.current.classList.remove('footer-link-animate');
        window.open(url, '_blank');
      }, 400);
    }
  };

  return (
    <div className='footer'>
        <div className="footer-logo">
             <img src={logo} alt="" height="50px" />
                         <img src={logoText} alt="" height="80px"  width="100"/>
            
        </div>
        <ul className='footer-links'>
<li><Link to="/about" style={{textDecoration:'none',color:'inherit'}}>About</Link></li>
<li ref={prodRef} onClick={()=>handleAnimatedNav(prodRef)} style={{cursor:'pointer'}}>Products</li>
<li ref={offRef} onClick={()=>handleAnimatedNav(offRef)} style={{cursor:'pointer'}}>Offices</li>
<li ref={compRef} onClick={()=>handleAnimatedNav(compRef)} style={{cursor:'pointer'}}>Company</li>
<li ref={contactRef} onClick={()=>handleAnimatedNav(contactRef)} style={{cursor:'pointer'}}>Contact</li>
        </ul>
        <div className='footer-social-icon'>
<div className="footer-icon-container" ref={instaRef} onClick={()=>handleSocialMediaClick(instaRef, 'https://www.instagram.com/ur.rajan?igsh=cDFvcDdxZW5wemU3')} style={{cursor:'pointer'}}>
<img src={instagram_icon} alt="" height="30px" />
</div>
<div className="footer-icon-container" ref={fbRef} onClick={()=>handleSocialMediaClick(fbRef, 'https://www.facebook.com/')} style={{cursor:'pointer'}}>
<img src={facebook_icon} alt="" height="30px"  />
</div>
<div className="footer-icon-container" ref={waRef} onClick={()=>handleSocialMediaClick(waRef, 'https://wa.me/')} style={{cursor:'pointer'}}>
<img src={whatsapp_icon} alt=""  height="30px" />
</div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>All Rights Reserved to Liceria#2025</p>
        </div>
    </div>
  )
}

export default Footer