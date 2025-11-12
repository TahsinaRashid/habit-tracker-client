import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import back from "../assets/images.png";


const ErrorPage = () => {


    return (

        <div>
             <div className="flex flex-col items-center justify-center py-2 text-white p-6"> 
            <div>
                <img src={back} alt="" />
            </div>
            
            <p className="text-lg text-gray-700 mb-8 text-center">
                Sorry!This page is unavailable...
            </p>
            
            <Link 
                to="/" 
                className=" btn btn-xs text-right  bg-linear-to-r from-green-500 to-green-800 text-white">
                Back To Home
            </Link>
        </div>
        </div>
       

        
        

    );
};

export default ErrorPage;
