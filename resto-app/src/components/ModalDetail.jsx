import React, { useState } from 'react';

const ModalDetail = ({ isOpen, onClose, menu, addToCart }) => {
    const [quantity, setQuantity] = useState(1); 

    if (!isOpen || !menu) return null; 

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1); 
        }
    };

    const totalPrice = menu.price * quantity;

    const handleAddToCart = () => {
        addToCart({ ...menu, quantity }); 
        resetQuantity();
    };

    const resetQuantity = () => {
        setQuantity(1); 
    };

    return (
        <>
            {/* Main modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {menu.title}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => {
                                        onClose();
                                        resetQuantity(); 
                                    }}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <img className="p-4 rounded-lg h-48 w-full object-cover" src={menu.imageUrl} alt={menu.title} />
                                <div className="flex justify-between items-center">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">Rp {totalPrice}</p> {/* Menampilkan harga */}
                                    <div className="flex items-center">
                                        <button 
                                            onClick={decreaseQuantity} 
                                            className="px-2 py-1 text-white bg-rose-600 rounded-l"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
                                        <button 
                                            onClick={increaseQuantity} 
                                            className="px-2 py-1 text-white bg-rose-600 rounded-r"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                                        onClick={handleAddToCart} 
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={() => {
                                            onClose();
                                            resetQuantity(); 
                                        }}
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-rose-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalDetail;