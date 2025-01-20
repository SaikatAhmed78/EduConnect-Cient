import React from 'react';
import Navbar from '../Common/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';

const MainLayout = () => {
    return (
        <div>

            <Navbar />

            <div className='min-h-[calc(100vh-306px)]'><Outlet></Outlet></div>

            <Footer />

        </div>
    );
};

export default MainLayout;