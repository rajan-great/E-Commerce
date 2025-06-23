import React, { useContext, useState } from 'react'
import "../CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from "../assets/dropdown_icon.png"
import Item from '../Components/Item/Item'

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'priceLowHigh', label: 'Price: Low to High' },
  { value: 'priceHighLow', label: 'Price: High to Low' },
  { value: 'nameAZ', label: 'Name: A-Z' },
  { value: 'nameZA', label: 'Name: Z-A' },
];

const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const categoryItems = all_product.filter(item => props.category === item.category);

  // Sorting logic
  const sortedItems = [...categoryItems].sort((a, b) => {
    if (sortBy === 'priceLowHigh') return Number(a.new_price) - Number(b.new_price);
    if (sortBy === 'priceHighLow') return Number(b.new_price) - Number(a.new_price);
    if (sortBy === 'nameAZ') return a.name.localeCompare(b.name);
    if (sortBy === 'nameZA') return b.name.localeCompare(a.name);
    return 0;
  });

  // Show first 12 by default, all on Explore More
  const itemsToShow = showAll ? sortedItems : sortedItems.slice(0, 12);
  
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing {showAll ? sortedItems.length : Math.min(12, sortedItems.length)}</span> out of {sortedItems.length} products
        </p>
        <div className='shopcategory-sort' tabIndex={0} onClick={() => setShowDropdown(v => !v)} onBlur={() => setShowDropdown(false)}>
          Sort by <img src={dropdown_icon} alt="" height="20px"/>
          {showDropdown && (
            <div className='shopcategory-sort-dropdown'>
              {sortOptions.map(option => (
                <div
                  key={option.value}
                  className={`shopcategory-sort-option${sortBy === option.value ? ' selected' : ''}`}
                  onClick={e => { setSortBy(option.value); setShowDropdown(false); e.stopPropagation(); }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {itemsToShow.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
      {!showAll && sortedItems.length > 12 && (
        <div className="shopcategory-loadmore" onClick={() => setShowAll(true)} style={{cursor:'pointer'}}>
          Explore More
        </div>
      )}
    </div>
  )
}

export default ShopCategory