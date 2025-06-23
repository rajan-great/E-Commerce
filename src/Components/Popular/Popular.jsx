import React from 'react'
import "./Popular.css"
import Item from "../Item/Item"
import data_product from '../../assets/data'
import { useNavigate } from 'react-router-dom'
const Popular = () => {
  const navigate = useNavigate();
  const handleItemClick = (category) => {
    if (category === 'men') navigate('/mens');
    else if (category === 'women') navigate('/womens');
    else if (category === 'kids' || category === 'kid') navigate('/kids');
    else navigate('/');
    window.scrollTo(0, 0);
  };
  return (
    <div className='popular'>
      <h1>Top Women Brands</h1>
      <hr/>
      <div className='popular-item'>
        {data_product.map((item,i)=>{
          return (
            <div key={i} onClick={() => handleItemClick(item.category)} style={{cursor:'pointer'}}>
              <Item 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price}
                category={item.category}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Popular