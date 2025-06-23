import React from 'react'
import "./Offers.css"
import exclusive from "../../assets/exclu.webp"
import { useNavigate } from 'react-router-dom';

const Offers = () => {
  const navigate = useNavigate();
  const handleCheckNow = () => {
    navigate('/womens');
    window.scrollTo(0, 0);
  };
  return (
    <div className='offers'>
        <div className="offers-left">
           <h1>Exclusive</h1>
           <h1>Offers For You</h1>
           <p>ONLY ON BEST SELLERS PRODUCTS</p>
           <button onClick={handleCheckNow}>Check Now</button>
        </div>
        <div className="offers-right">
<img src={exclusive} alt="" />
        </div>
    </div>
  )
}

export default Offers