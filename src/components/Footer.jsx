// import { Link } from 'react-router';
// import {Mail } from 'lucide-react';
// import { GiLifeBar } from 'react-icons/gi';
// import { FaXTwitter } from 'react-icons/fa6';
// import { FaFacebook, FaInstagram } from 'react-icons/fa';


// const Footer = () => {
//   const currentYear = new Date().getFullYear();


//   return (
//     <footer className="bg-linear-to-r from-amber-800 to-green-600 py-8 px-4  rounded-xl mt-20">
//       <div className="pt-15 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div>
//           <div className=" space-x-2 text-black">
//           <GiLifeBar size={35}/>
//           <span className="text-md font-bold text-black dark:text-gray-200">Habit Tracker</span>
//           </div>
//         </div>
//         <div>
//           <a className='text-md font-bold text-black dark:text-gray-200' >Terms & Conditions</a>
//         </div>
//         <div>
//           <h3 className="text-lg font-bold mb-4 text-black dark:text-gray-200">Contact</h3>
//           <div>
//             <a
//               className="flex items-center text-black dark:text-gray-200 ">
//               <Mail size={18} /> habit@gmail.com
//             </a>
//              <div className="flex space-x-4 ">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-200 hover:text-blue-700">
//               <FaFacebook size={24} />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-200 hover:text-blue-400">
//               <FaXTwitter size={24} />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-200 hover:text-pink-600">
//               <FaInstagram size={24} />
//             </a>
          
//           </div>
//           </div>
//         </div>
//       </div>
//       <div className="border-t lg:mb-0 md:mb-0 mb-20 border-[#600909] mt-8 pt-4 text-center">
//         <p className="text-sm text-black dark:text-gray-200">
//           © {currentYear} Habit Tracker. All Rights Reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from 'react-router-dom';
import {Mail } from 'lucide-react';
import { GiLifeBar } from 'react-icons/gi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear();


return (
        <footer className="bg-gradient-to-r from-amber-800 to-green-600 py-12 px-4
         mt-20 text-white shadow-xl">
          <div className= " container  grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-8 text-sm">
            <div className="p-5 lg:col-span-1 flex flex-col space-y-3">
              <div className="flex  space-x-2 text-black  items-center">
                <GiLifeBar size={40}/>
                <span className="text-2xl font-extrabold tracking-wide">
                  Habit Tracker
                </span>
              </div>
                <p className="text-black font-sans text-lg mt-2 max-w-xs">
                  -Build better habits, one day at a time.
                </p>
            </div>
            <div className="px-5 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-10">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold mb-2 text-black border-b border-black pb-1">
                Contact Us
              </h3>
              <a
                  href="mailto:habit@gmail.com"
                  className="flex items-center space-x-2 text-black font-medium transition duration-200 text-sm">habit@gmail.com
                </a>
                <div className="pt-4">
               <div className="flex space-x-2 text-left ">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-blue-500 transition duration-200">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black transition duration-200">
              <FaXTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-pink-400 transition duration-200">
              <FaInstagram size={24} />
            </a>
          </div>
             </div>
               
               
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold mb-2 text-black border-b border-black pb-1">
                    Legal
                </h3>
              <Link  className="text-black font-medium transition duration-200">Terms & Conditions</Link>
              <Link  className="text-black font-medium transition duration-200">Privacy Policy</Link>
              
            </div>   
                   
        </div>
          
      </div>
      <div className="border-t border-black mt-12 pt-6 text-center">
        <p className="text-sm font-medium text-black">
          © {currentYear} Habit Tracker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;