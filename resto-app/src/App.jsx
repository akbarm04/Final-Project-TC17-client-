import { useState, useEffect } from "react";
import './App.css';
import CardItem from "./components/CardItem";
import Navbar from "./components/Navbar";
import ModalDetail from "./components/ModalDetail"; 
import Swal from 'sweetalert2';

function App() {
    const [dataMenu, setDataMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Makanan');
    const [cartCount, setCartCount] = useState(0); 
    const [cartItems, setCartItems] = useState([]); 
    const [isDetailOpen, setIsDetailOpen] = useState(false); 
    const [selectedMenu, setSelectedMenu] = useState(null); 
    const [searchQuery, setSearchQuery] = useState(''); // State untuk menyimpan query pencarian


    async function getData() {
        const url = "https://final-project-tc17-server-production.up.railway.app/menu";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            setDataMenu(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const filteredMenu = dataMenu.filter(menu => menu.Kategori === selectedCategory && 
        menu.title.toLowerCase().includes(searchQuery.toLowerCase()) );

    const showDetail = (menu) => {
        setSelectedMenu(menu); 
        setIsDetailOpen(true); 
    };

    const closeDetailModal = () => {
        setIsDetailOpen(false);
        setSelectedMenu(null);
    };

    const addToCart = (menu) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === menu.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === menu.id ? { ...item, quantity: item.quantity + menu.quantity } : item
                );
            }
            return [...prevItems, { ...menu, quantity: menu.quantity }];
        });
    };

    useEffect(() => {
        setCartCount(cartItems.length); 
    }, [cartItems]);

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems(prevItems => {
            return prevItems.map(item => 
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
              );
            });
        };
    
        const checkout = () => {
            if (cartItems.length === 0) {
                Swal.fire({
                    title: 'Cart is Empty!',
                    text: 'Please add items to your cart before checking out.',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            } else {
            Swal.fire({
                title: 'Checkout Successful!',
                text: 'Your cart has been checked out successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
            setCartItems([]); 
            setCartCount(0); 
            });
        }
        };
    
        return (
            <>
                {/* Navbar */}
                <Navbar 
                    cartCount={cartCount} 
                    cartItems={cartItems} 
                    updateCartItemQuantity={updateCartItemQuantity} 
                    checkout={checkout} 
                    searchQuery={searchQuery} // Mengirimkan query pencarian ke Navbar
                    setSearchQuery={setSearchQuery}
                />
                
                {/* Heading */}
                <div className="text-center my-8">
                    <h1 className="text-3xl font-bold dark:text-rose-700">Menu Restaurant Kansha</h1>
                    {/* Category Menu */}
                    <div className="inline-flex rounded-md shadow-sm mt-4" role="group">
                        <button 
                            type="button" 
                            className={`px-4 py-2 text-sm font-medium ${selectedCategory === 'Makanan' ? 'bg-rose-700 text-white' : 'text-rose-700 bg-transparent border border-rose-700'} rounded-s-lg hover:bg-rose-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-rose-700`}
                            onClick={() => setSelectedCategory('Makanan')}
                        >
                            Makanan
                        </button>
                        <button 
                            type="button" 
                            className={`px-4 py-2 text-sm font-medium ${selectedCategory === 'Minuman' ? 'bg-rose-700 text-white' : 'text-rose-700 bg-transparent border border-rose-700'} rounded-e-lg hover:bg-rose-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-rose-700`}
                            onClick={() => setSelectedCategory('Minuman')}
                        >
                            Minuman
                        </button>
                    </div>
                </div>
     
                {/* Card Grid */}
                <div className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card */}
                        {filteredMenu.map((menu, index) => {
                            return <CardItem menu={menu} key={index} showDetail={showDetail} />;
                        })}
                        {/* End Card */}
                    </div>
                </div>
    
                {/* Modal Detail */}
                <ModalDetail 
                    isOpen={isDetailOpen} 
                    onClose={closeDetailModal} 
                    menu={selectedMenu} 
                    addToCart={addToCart} 
                />
            </>
        );
    }
    
    export default App;