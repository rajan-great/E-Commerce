import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Bredcrums from '../Components/Bredcrums/BredCrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import Description from '../Components/Description/Description';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === parseInt(productId));
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Bredcrums product={product}/>
      <ProductDisplay product={product}/>
      <div style={{textAlign:'center',margin:'20px'}}>
        <button style={{padding:'10px 24px',fontSize:'16px',background:'#ff4141',color:'#fff',border:'none',borderRadius:'8px',cursor:'pointer'}} onClick={()=>setShowModal(true)}>
          View Details
        </button>
      </div>
      {showModal && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:'32px',borderRadius:'12px',minWidth:'320px',maxWidth:'90vw',boxShadow:'0 2px 16px rgba(0,0,0,0.15)',position:'relative'}}>
            <button onClick={()=>setShowModal(false)} style={{position:'absolute',top:'12px',right:'16px',background:'none',border:'none',fontSize:'22px',cursor:'pointer',color:'#888'}}>×</button>
            <h2 style={{color:'#ff4141',marginBottom:'12px'}}>Item Details</h2>
            <p><b>Name:</b> {product?.name}</p>
            <p><b>Description:</b> {product?.description || 'No description available.'}</p>
            <p><b>Price:</b> Rs{product?.new_price}</p>
            <p><b>Category:</b> {product?.category}</p>
          </div>
        </div>
      )}
      <Description/>
      <RelatedProducts/>
    </div>
  )
}

export default Product