import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import logo from '../../../Images/logo.png'

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
    console.log(user)
  const handleLogOut = () =>{
    logOut()
    .then(() =>{})
    .catch(err => console.log(err));
  }

   const menuItems  =  <React.Fragment>

            <li><Link to="/"> Home
            {/* <div className="dropdown dropdown-hover  dropdown-right">
  <label tabIndex={0} >Home</label>
  <ul tabIndex={0} className="dropdown-content menu lg:m-9 sm:p-[-4px] shadow bg-base-100 rounded-box w-52">
    <li><Link to="">Item 1</Link></li>
  
  </ul>
</div>
             */}
            </Link></li>
            <li><Link to="/appointment">Our Services</Link></li>
            <li><Link to="/weddingShop">Bridal Shop</Link></li>
            
            <li><Link to="/about">Our Story</Link></li>
            {user?.uid ? 
         <>
         <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogOut}>Sign Out</button></li>
         </>
          :<li><Link to="/login">Login</Link></li>}
    </React.Fragment>
    return (
        <div className="navbar bg-base-100 flex justify-between t4 lg:px-52" style={{backgroundColor:'#D4B0A51A'}} >
        <div className="navbar-start">
          
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"> 
          {menuItems}
            </ul>
          </div>
          
         
          <Link to="/" className="normal-case text-xl mx-auto"> <img src={logo} className='w-[75px] mx-auto' alt="" /> </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {menuItems}
          </ul>
          <ul className="menu menu-horizontal bg-base-100">
  

  {/* <li tabIndex={0}>
    <span>Parent</span>
    <ul className=" bg-slate-600">
      <li><a>Submenu 1</a></li>
      <li><a>Submenu 2</a></li>
      <li><a>Submenu 3</a></li>
    </ul>
  </li> */}

</ul>
          {/* ------------------------ */}
          <div className="flex-none">
    <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
        </label>
        <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
        </div>
        </div>
        </div>
          {/* ------------------------ */}
          {/* <img className='w-14 h-11 rounded-full' src={user.photoURL}alt="" />
          <p className='mx-4 '>{user.displayName}</p> */}
        </div>
      </div>
    );
};

export default Navbar;