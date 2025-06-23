import React from 'react'
import "./NewCollections.css"
import new_collections from '../../assets/newcollections'
import Item from '../Item/Item'
import { useNavigate } from 'react-router-dom'

const NewCollections = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/womens');
    window.scrollTo(0, 0);
  };

  const handleItemClick = (category) => {
    if (category === 'men') navigate('/mens');
    else if (category === 'women') navigate('/womens');
    else if (category === 'kids' || category === 'kid') navigate('/kids');
    else navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <div className='newcollections'>
      <div className='collections-header'>
        <h1>NEW COLLECTIONS</h1>
        <button className='view-all-btn' onClick={handleViewAll}>
          View All
        </button>
      </div>
      <hr/>
      <div className='collections'>
        {new_collections.map((item,i)=>{
          return (
            <div className='collection-item-wrapper' key={i} onClick={() => handleItemClick(item.category)}>
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

export default NewCollections