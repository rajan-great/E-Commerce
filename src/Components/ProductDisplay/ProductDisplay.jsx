import React, { useContext, useState } from 'react'
import "./ProductDisplay.css"
import star_icon from "../../assets/star_icon.png"
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const {addTocart} = useContext(ShopContext);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeAnim, setSizeAnim] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    addTocart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeAnim(true);
    setTimeout(() => setSizeAnim(false), 500);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className='productdisplay-main-img-container'>
          <img 
            className='productdisplay-main-img' 
            src={productImages[selectedImage]} 
            alt={product.name} 
          />
        </div>
        <div className="productdisplay-img-list">
          {productImages.map((img, index) => (
            <div 
              key={index} 
              className={`thumbnail-container ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`${product.name} view ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="productdisplay-right">
<h1>{product.name}</h1>
<div className="productdisplay-right-star">
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_icon} alt="" height="20px" />
  <img src={star_dull_icon} alt="" height="20px" />
  <p>(130)</p>
</div>
<div className="productdisplay-right-prices">
  <div className="productdisplay-right-price-old">
{product.old_price}
  </div>
  <div className="productdisplay-right-price-new">
    {product.new_price}
  </div>
  </div>
  <div className="productdisplay-right-description">
   These cotton shorts bring together function and comfort. Whether you're lounging at home or heading out for a walk, they're your go-to for easy style and comfort..
  </div>
  <div className='productdisplay-right-size'>
    <h1>Select Size</h1>
    <div className="productdisplay-right-sizes">
      {['S','M','L','XL','XXL'].map(size => (
        <div
          key={size}
          className={`size-btn${selectedSize === size ? ' selected-size' : ''}${sizeAnim && selectedSize === size ? ' size-animate' : ''}`}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </div>
  </div>
  <button 
    className={added ? 'add-to-cart-animate' : ''}
    onClick={handleAddToCart}
    disabled={added}
  >
    {added ? 'Added!' : 'ADD TO CART'}
  </button>
  <div className="productdisplay-right-category">
    <span>Category:<span>Women ,T-Shirt , Crop Top</span></span>
  </div>
  <div className="productdisplay-right-category">
    <span>Tags:<span>Modern ,Latest , Trend Shorts</span></span>
  </div>
</div>
      </div>
    
  )
}

export default ProductDisplay