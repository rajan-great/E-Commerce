import React from "react";
import "./Hero.css";
import hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow_icon.png";
import men from "../../assets/po.png";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const handleLatestClick = () => {
    navigate('/womens');
    window.scrollTo(0, 0);
  };
  return (
    <div className="hero">
      <div className="hero-left" style={{fontFamily: "fangsong"}}>
        <h2>🛒 Best Deals, Best Prices!</h2>

        <div className="hero-hand-icon">
          <p>Discover New </p>
        </div>
        <p>collections</p>
        <p>for All Ages!</p>
        <div className="hero-latest-btn" onClick={handleLatestClick} style={{cursor: 'pointer'}}>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" height="30px" />
        </div>
      </div>

      <div className="hero-right">
        <img src={men} alt="" height="600px"  width="600px"/>
      </div>
    </div>
  );
};

export default Hero;
