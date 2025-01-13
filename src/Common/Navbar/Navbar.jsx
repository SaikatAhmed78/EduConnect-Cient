import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center">
                    <FaHome className="mr-2" />
                    EduConnect
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    {user && (
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    )}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-outline btn-white mr-2 flex items-center">
                            <FaSignInAlt className="mr-2" />
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline btn-white flex items-center">
                            <FaUserPlus className="mr-2" />
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="User" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black">
                                <li><Link to="/dashboard" className="justify-between flex items-center">
                                    <FaUserCircle className="mr-2" />
                                    Dashboard
                                </Link></li>
                                <li><button onClick={logout} className="flex items-center">
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button></li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
