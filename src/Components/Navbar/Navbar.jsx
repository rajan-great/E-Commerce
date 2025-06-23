import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo2.png"
import logoText from "../../assets/logo3.png"
import cart_icon from "../../assets/cart.png"
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import search_icon from '../../assets/search_icon.png';

const Navbar = () => {
    const [menu,setMenu]=useState("home")
    const {getTotalCartItems, all_product} = useContext(ShopContext)
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      else setUser(null);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    };

    const handleSearch = (e) => {
      e.preventDefault();
      let results = all_product.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (categoryFilter !== 'all') {
        results = results.filter(item => item.category === categoryFilter);
      }
      if (priceFilter !== 'all') {
        if (priceFilter === 'low') results = results.filter(item => item.new_price < 1000);
        if (priceFilter === 'mid') results = results.filter(item => item.new_price >= 1000 && item.new_price < 2000);
        if (priceFilter === 'high') results = results.filter(item => item.new_price >= 2000);
      }
      setSearchResults(results);
    };

    return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" height="50px" />
             <img src={logoText} alt="" height="80px"  width="100"/>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:"none",color:"#626262"}} to="/">Home</Link>{menu==="home" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none",color:"#626262"}} to="/mens">Men
            </Link>{menu==="mens" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none",color:"#626262"}} to="/womens">Women
            </Link>{menu==="womens" ? <hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none",color:"#626262"}} to="/kids">Kids</Link>{menu==="kids" ? <hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
          <img src={search_icon} alt="search" height="30px" style={{cursor:'pointer'}} onClick={()=>setShowSearch(!showSearch)} />
          {user ? (
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{
                color: '#333',
                fontWeight: '500',
                fontSize: '14px'
              }}>Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                style={{
                  background: '#ff4141',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login"> 
              <button style={{
                background: '#ff4141',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>Login</button>
            </Link>
          )}
            <Link to="/cart"><img src={cart_icon} alt="" height="40px" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        {showSearch && (
          <div className="nav-search-modal" style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '70px',
            margin: '0 auto',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'inherit',
          }}>
            <button onClick={()=>setShowSearch(false)} style={{alignSelf:'flex-end',margin:'5px 20px 0 0',background:'none',border:'none',fontSize:'22px',cursor:'pointer',color:'#888'}}>×</button>
            <form onSubmit={handleSearch} style={{display:'flex',gap:'10px',alignItems:'center',marginTop:'10px', fontFamily: 'inherit'}}>
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{padding:'8px',fontSize:'16px',borderRadius:'6px',border:'1px solid #ccc',fontFamily:'inherit'}} />
              <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} style={{padding:'8px',fontSize:'16px',borderRadius:'6px',border:'1px solid #ccc',fontFamily:'inherit'}}>
                <option value="all">All Categories</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kids</option>
              </select>
              <select value={priceFilter} onChange={e=>setPriceFilter(e.target.value)} style={{padding:'8px',fontSize:'16px',borderRadius:'6px',border:'1px solid #ccc',fontFamily:'inherit'}}>
                <option value="all">All Prices</option>
                <option value="low">Below 1000</option>
                <option value="mid">1000 - 1999</option>
                <option value="high">2000 & above</option>
              </select>
              <button type="submit" style={{padding:'8px 16px',fontSize:'16px',borderRadius:'6px',background:'#ff4141',color:'#fff',border:'none',fontFamily:'inherit',cursor:'pointer'}}>Search</button>
            </form>
            <div className="nav-search-results" style={{
              maxHeight:'300px',
              minWidth:'400px',
              width:'40vw',
              overflowY:'auto',
              background:'#fff',
              padding:'10px',
              border:'1px solid #ccc',
              borderRadius:'12px',
              marginTop:'10px',
              boxShadow:'0 4px 16px rgba(0,0,0,0.12)',
              fontFamily:'inherit',
            }}>
              {searchResults.length === 0 && <div style={{textAlign:'center',color:'#888',fontSize:'16px'}}>No results found.</div>}
              {searchResults.map(item => (
                <div key={item.id} style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px',borderBottom:'1px solid #eee',paddingBottom:'5px',fontFamily:'inherit'}}>
                  <img src={item.image} alt={item.name} height="40px" style={{borderRadius:'4px'}} />
                  <span style={{fontWeight:'bold',fontSize:'16px',fontFamily:'inherit'}}>{item.name}</span>
                  <span style={{color:'#888',fontSize:'15px',fontFamily:'inherit'}}>{item.category}</span>
                  <span style={{color:'#ff4141',fontWeight:'bold',fontSize:'15px',fontFamily:'inherit'}}>Rs{item.new_price}</span>
                  <Link to={`/product/${item.id}`} style={{marginLeft:'auto',color:'#007bff',fontFamily:'inherit'}} onClick={()=>setShowSearch(false)}>View</Link>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default Navbar