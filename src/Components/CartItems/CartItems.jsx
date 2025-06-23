import React, { useContext, useState } from 'react'
import "./CartItems.css"
import remove_icon from "../../assets/remove.webp"
import { ShopContext } from '../../Context/ShopContext'
const CartItems = () => {
    const { getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [showCheckout, setShowCheckout] = useState(false);
    const [form, setForm] = useState({ name: '', address: '', pincode: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className='cartItems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div key={e.id}>
                        <div className='cartItems-format cartitems-format-main'>
                            <img src={e.image} alt="" height="100px" />
                            <p>{e.name}</p>
                            <p>Rs{e.new_price}</p>
                            <button className='cartitems-quantity'>
                                {cartItems[e.id]}
                            </button>
                            <p>{e.new_price*cartItems[e.id]}</p>
                            <img src={remove_icon} alt="" onClick={()=> removeFromCart(e.id)} height="20px"/>
                        </div>
                        <hr/>
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs{getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>Rs{getTotalCartAmount()}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowCheckout(true)}>PROCEED TO CHECKOUT</button>
                    {showCheckout && (
                        <form className="checkout-form" onSubmit={handleCheckout}>
                            <h2>Checkout</h2>
                            <label>
                                Name:
                                <input type="text" name="name" value={form.name} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Address:
                                <textarea name="address" value={form.address} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Pincode:
                                <input type="text" name="pincode" value={form.pincode} onChange={handleInputChange} required />
                            </label>
                            <div className="checkout-total">
                                <strong>Total to Pay: Rs{getTotalCartAmount()}</strong>
                            </div>
                            <button type="submit">Place Order</button>
                            {submitted && <div className="checkout-success">Order placed successfully!</div>}
                        </form>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type='text' placeholder='promo code'/>
                        <button>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems