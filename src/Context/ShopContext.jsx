import React, { createContext, useState, useEffect } from 'react';
import all_product from "../assets/all_product";
import CartItems from "../Components/CartItems/CartItems";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getTotalCartItems = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ cart, setCart, getTotalCartItems }}>
      {children}
    </ShopContext.Provider>
  );
};

const getDefaultCart = () =>{
    let cart = {};
    for(let index=0;index < all_product.length+1;index++){
       cart[index] = 0
    } return cart;
}

const ShopContextProvider = (props) =>{
    // Load cart from localStorage if available
    const [cartItems,setCartItems] = useState(() => {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : getDefaultCart();
    });

    // Persist cart to localStorage on change
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addTocart = (itemId) =>{
        setCartItems((prev)=>{
            const updated = {...prev,[itemId]:prev[itemId]+1};
            console.log(updated);
            return updated;
        });
    }
  
        const removeFromCart = (itemId) =>{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1})
            )
        }
  
        const getTotalCartAmount = () =>{
            let totalAmount = 0;
            for(const item in cartItems)
            {
                if(cartItems[item]>0){
                    let itemInfo  = all_product.find((product)=>product.id === Number(item))
                    totalAmount += itemInfo.new_price* cartItems[item];
                }
              
            }
            return totalAmount;
        }

        const getTotalCartItems = () =>{
            let totalItmes = 0;
            for(const item in cartItems)
            {
                if(cartItems[item]>0){
                    totalItmes += cartItems[item];
                }
              
            }
            return totalItmes;
        }
        const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTocart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
{props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;