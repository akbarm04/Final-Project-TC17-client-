import React, { useState } from 'react';

const Navbar = ({ cartCount, cartItems, updateCartItemQuantity, checkout }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); 
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800 antialiased sticky top-0 z-50">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="shrink-0">
              <a href="#" title="" className="flex items-center space-x-3 rtl:space-x-reverse">
                {/* Logo Desktop */}
                <img src="Logo.png" className="hidden md:block h-10" alt="Flowbite Logo" />
                {/* Logo Mobile */}
                <img src="Logo Only.png" className="block md:hidden h-10" alt="Flowbite Logo" />
              </a>
            </div>
          </div>

          {/* Input Pencarian */}
          <div className="relative md:block mx-auto w-1/2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Cart Button */}
          <div className="relative flex items-center md:space-x-2">
            <button
              id="myCartDropdownButton1"
              type="button"
              className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              onClick={toggleCart} 
              >
              <span className="sr-only">Cart</span>
              <svg className="w-8 h-8 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
              </svg>
              <span>{cartCount}</span> 
            </button>

            {/* Dropdown Cart */}
            {isCartOpen && (
              <div className="absolute -right-44 transform -translate-x-1/2 top-full mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg"> 
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-right">Your Cart</h3>
                  <ul className="list-none p-0 m-0">
                    {cartItems.length ? cartItems.map((item, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded" />
                          <span>{item.title}</span>
                        </div>
                        <span>Rp {item.price * item.quantity}</span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} 
                            className="px-2 py-1 text-white bg-rose-600 rounded-l" 
                            disabled={item.quantity <= 1} 
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-t border-b border-gray-300">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} 
                            className="px-2 py-1 text-white bg-rose-600 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    )) : (
                      <li className="py-2">Your cart is empty.</li>
                    )}
                  </ul>
                  <div className="mt-4">
                    <button 
                      className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600" 
                      onClick={checkout} 
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;