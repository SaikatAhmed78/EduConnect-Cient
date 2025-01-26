import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Spinner/LoadingSpinner';


const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const navigate = useNavigate();

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
        <nav className="navbar bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 text-white shadow-lg w-full px-4 lg:px-8">
            <div className="navbar-start flex items-center">
                <Link to="/" className="flex items-center text-2xl font-extrabold tracking-wide">
                    <div className="bg-white text-blue-700 px-3 py-1 rounded-full mr-2 shadow-lg">
                        EC
                    </div>
                    <span className="hidden md:block">EduConnect</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-4">
                    <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
                    <li><Link to="/aboutUs" className="hover:text-yellow-400">About Us</Link></li>
                    {user && (
                        <li><Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
                    )}
                </ul>
            </div>
            <div className="navbar-end flex items-center z-40">
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
                                    <img src={user.photoURL || ''} alt="User Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-white rounded-lg w-44 text-blue-800">
                                <li><Link to="/dashboard" className="flex items-center">
                                    <FaUserCircle className="mr-2" />
                                    Dashboard
                                </Link></li>
                                <li><button onClick={handleSignOut} className="flex items-center">
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button></li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
