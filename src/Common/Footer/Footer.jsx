import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">EduConnect</h2>
                        <p className="mb-4">Connecting students and tutors for a better learning experience.</p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                                <FaFacebook size="24" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                                <FaTwitter size="24" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
                                <FaInstagram size="24" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700">
                                <FaLinkedin size="24" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Resources</h2>
                        <ul className="space-y-2">
                            <li><a href="/blog" className="hover:underline">Blog</a></li>
                            <li><a href="/tutorials" className="hover:underline">Tutorials</a></li>
                            <li><a href="/faq" className="hover:underline">FAQ</a></li>
                            <li><a href="/support" className="hover:underline">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Contact Info</h2>
                        <ul className="space-y-2">
                            <li>Email: saikatahmed78@gmail.com</li>
                            <li>Phone: +880 13033 - 90718</li>
                            <li>Address: 1234 Learning Ave, Rangpure City, bangladesh</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p>&copy; {new Date().getFullYear()} EduConnect. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
