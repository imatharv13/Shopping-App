import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const {items} = useSelector((state) => state.cart);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white p-4 flex justify-between items-center relative">
            <Link to="/" className="text-black text-2xl font-bold">
                E-Commerce App
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/" className="text-black hover:underline">
                    Home
                </Link>
                <Link to="/products" className="text-black hover:underline">
                    Shop
                </Link>
                <Link to={isAuthenticated ? "/cart" : "/login"} className="relative text-black hover:underline">
                    Cart
                    {isAuthenticated && totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
                {isAuthenticated && (
                    <Link to="/orders" className="text-black hover:underline">
                        Orders
                    </Link>
                )}
                {isAuthenticated ? (
                    <>
                        {user && ( 
                            <span className="text-black">
                                Welcome, {user.displayName || user.email}
                            </span> 
                        )}
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-black hover:underline"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-black hover:underline"
                        >   
                            Register
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden text-black focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
                    <div className="flex flex-col py-4 px-4 space-y-4">
                        <Link to="/" className="text-black hover:underline" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link to="/products" className="text-black hover:underline" onClick={toggleMenu}>
                            Shop
                        </Link>
                        <Link to={isAuthenticated ? "/cart" : "/login"} className="relative text-black hover:underline" onClick={toggleMenu}>
                            Cart
                            {isAuthenticated && totalItems > 0 && (
                                <span className="ml-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 inline-flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated && (
                            <Link to="/orders" className="text-black hover:underline" onClick={toggleMenu}>
                                Orders
                            </Link>
                        )}
                        {isAuthenticated ? (
                            <>
                                {user && ( 
                                    <span className="text-black text-sm">
                                        Welcome, {user.displayName || user.email}
                                    </span> 
                                )}
                                <div className="pt-2">
                                    <LogoutButton />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-black hover:underline"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-black hover:underline"
                                    onClick={toggleMenu}
                                >   
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
export default Navbar;