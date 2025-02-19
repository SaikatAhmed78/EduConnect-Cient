import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignInAlt, FaUserPlus, FaUserCog, FaSignOutAlt, FaMoon, FaSun, FaBars } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import { ThemeContext } from '../../Update/ThemeProvider';

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await logOut();
            Swal.fire({
                icon: 'success',
                title: 'Logged Out Successfully',
                text: 'You have been logged out. See you again!',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/login');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: error.message,
            });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <nav className={`navbar ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 text-white'} shadow-lg w-full px-4 lg:px-8`}>
            <div className="navbar-start flex items-center justify-between w-full">
                <Link to="/" className="flex items-center text-2xl font-extrabold tracking-wide">
                    <div className="bg-white text-blue-700 px-3 py-1 rounded-full mr-2 shadow-lg">
                        EC
                    </div>
                    <span className="hidden md:block">EduConnect</span>
                </Link>

                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <FaBars className="w-6 h-6" />
                </button>
            </div>

            <div className={`navbar-center ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
                <ul className="menu menu-horizontal space-x-4">
                    <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
                    <li><Link to="/aboutUs" className="hover:text-yellow-400">About Us</Link></li>
                    <li><Link to="/all-sessionP" className="hover:text-yellow-400">All Study Session</Link></li>
                    {user && <li><Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>}
                </ul>
            </div>

            <div className="navbar-end flex items-center z-40">
                <button onClick={toggleTheme} className="p-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 transition-transform duration-300 transform hover:scale-110 shadow-md mr-4" aria-label="Toggle Theme">
                    {theme === 'dark' ? (
                        <FaSun className="text-yellow-500 w-6 h-6 transition-transform duration-500 rotate-180" />
                    ) : (
                        <FaMoon className="text-gray-700 w-6 h-6 transition-transform duration-500 rotate-180" />
                    )}
                </button>

                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-sm bg-yellow-400 text-blue-800 hover:bg-yellow-300 mr-2 flex items-center shadow-md">
                            <FaSignInAlt className="mr-2" />
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-sm bg-yellow-400 text-blue-800 hover:bg-yellow-300 flex items-center shadow-md">
                            <FaUserPlus className="mr-2" />
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border-2 border-yellow-400">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="User Avatar" />
                                    ) : (
                                        <h1 className='p-2 rounded-full bg-purple-500 text-white'>
                                            {user?.displayName ? user.displayName.charAt(0) : '?' }
                                        </h1>
                                    )}
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-white rounded-lg w-44 text-blue-800">
                                <li>
                                    <Link to="/dashboard" className="flex items-center">
                                        <FaUserCircle className="mr-2" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleSignOut} className="flex items-center">
                                        <FaSignOutAlt className="mr-2" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
