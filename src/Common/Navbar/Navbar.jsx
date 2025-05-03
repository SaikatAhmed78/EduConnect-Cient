import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBars, FaSun, FaMoon, FaHome, FaInfoCircle, FaClipboardList, FaTachometerAlt } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { ThemeContext } from "../../Update/ThemeProvider";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been logged out. See you again!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message,
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className={`sticky top-0 w-full px-4 lg:px-8 z-50 shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 text-white"}`}>
      <div className="flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-extrabold tracking-wide">
          <div className="bg-white text-blue-700 px-3 py-1 rounded-full mr-2 shadow-lg">EC</div>
          <span className="hidden md:block">EduConnect</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="w-6 h-6" />
        </button>

        {/* Mobile Menu */}
        <div className={`absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 lg:hidden transition-transform duration-300 ${isMenuOpen ? "block" : "hidden"}`}>
          <Link to="/" className="hover:text-yellow-400 flex items-center" onClick={() => setIsMenuOpen(false)}><FaHome className="mr-2" />Home</Link>
          <Link to="/aboutUs" className="hover:text-yellow-400 flex items-center" onClick={() => setIsMenuOpen(false)}><FaInfoCircle className="mr-2" />About Us</Link>
          <Link to="/all-sessionP" className="hover:text-yellow-400 flex items-center" onClick={() => setIsMenuOpen(false)}><FaClipboardList className="mr-2" />All Study Session</Link>
          {user && <Link to="/dashboard" className="hover:text-yellow-400 flex items-center" onClick={() => setIsMenuOpen(false)}><FaTachometerAlt className="mr-2" />Dashboard</Link>}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 flex items-center"><FaHome className="mr-2" />Home</Link>
          <Link to="/aboutUs" className="hover:text-yellow-400 flex items-center"><FaInfoCircle className="mr-2" />About Us</Link>
          <Link to="/all-sessionP" className="hover:text-yellow-400 flex items-center"><FaClipboardList className="mr-2" />All Study Session</Link>
          {user && <Link to="/dashboard" className="hover:text-yellow-400 flex items-center"><FaTachometerAlt className="mr-2" />Dashboard</Link>}
        </div>

        {/* Profile & Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-yellow-400 hover:text-yellow-300">
            {theme === "dark" ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
          </button>
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm bg-yellow-400 text-blue-800 hover:bg-yellow-300 flex items-center shadow-md">
                <FaSignInAlt className="mr-2" />Login
              </Link>
              <Link to="/signup" className="btn btn-sm bg-yellow-400 text-blue-800 hover:bg-yellow-300 flex items-center shadow-md">
                <FaUserPlus className="mr-2" />Sign Up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-yellow-400">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" />
                  ) : (
                    <h1 className="p-2 rounded-full bg-purple-500 text-white">{user?.displayName ? user.displayName.charAt(0) : "?"}</h1>
                  )}
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow bg-white rounded-lg w-44 text-blue-800">
                <li>
                  <Link to="/dashboard" className="flex items-center">
                    <FaUserCircle className="mr-2" />Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="flex items-center">
                    <FaSignOutAlt className="mr-2" />Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
