import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-600 rounded-2xl flex items-center justify-center text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                            📚
                        </div>
                        <span className="text-2xl font-black text-gray-900">Shario</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/resources"
                            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                        >
                            Browse Resources
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700 p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/resources"
                                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Browse Resources
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/login"
                                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-green-600 to-yellow-600 text-white font-bold py-3 px-6 rounded-xl text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
