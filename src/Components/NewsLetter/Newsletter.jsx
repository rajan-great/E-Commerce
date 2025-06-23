import React, { useState } from 'react'
import "./Newsletter.css"

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setShowMessage(true);
      setEmail('');
      
      setTimeout(() => {
        setShowMessage(false);
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className='newsletter'>
      <h1>Join the Liceria Style Community</h1>
      <p>Subscribe now & get 20% off</p>
      
      {showMessage && (
        <div className={`subscription-message ${isSubscribed ? 'success' : ''}`}>
          {isSubscribed ? 'Successfully Subscribed!' : 'Please enter a valid email'}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="newsletter-input-group">
          <input 
            type='email' 
            placeholder='Your Email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubscribed}>
            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Newsletter