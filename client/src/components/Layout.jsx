// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Layout = ({ children }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <h1 className="text-xl font-bold text-gray-900">
//                   StoreInventory
//                 </h1>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 {user?.role === 'admin' ? (
//                   <>
//                     <button
//                       onClick={() => navigate('/admin')}
//                       className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                     >
//                       Admin Dashboard
//                     </button>
//                     <button
//                       onClick={() => navigate('/sales')}
//                       className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                     >
//                       Sales
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate('/sales')}
//                     className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
//                   >
//                     Sales Dashboard
//                   </button>
//                 )}
//               </div>
//             </div>
            
//             {/* Desktop user info */}
//             <div className="hidden sm:flex sm:items-center sm:space-x-4">
//               <span className="text-sm text-gray-700">
//                 Welcome, {user?.name} ({user?.role})
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* Mobile menu button */}
//             <div className="sm:hidden flex items-center">
//               <button
//                 onClick={toggleMobileMenu}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {/* Hamburger icon */}
//                 <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMobileMenuOpen && (
//           <div className="sm:hidden">
//             <div className="pt-2 pb-3 space-y-1">
//               {user?.role === 'admin' ? (
//                 <>
//                   <button
//                     onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}
//                     className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
//                   >
//                     Admin Dashboard
//                   </button>
//                   <button
//                     onClick={() => { navigate('/sales'); setIsMobileMenuOpen(false); }}
//                     className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
//                   >
//                     Sales
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => { navigate('/sales'); setIsMobileMenuOpen(false); }}
//                   className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
//                 >
//                   Sales Dashboard
//                 </button>
//               )}
//             </div>
//             <div className="pt-4 pb-3 border-t border-gray-200">
//               <div className="flex items-center px-4">
//                 <div className="flex-shrink-0">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                     <span className="text-indigo-600 font-medium">
//                       {user?.name?.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <div className="text-base font-medium text-gray-800">{user?.name}</div>
//                   <div className="text-sm font-medium text-gray-500">{user?.role}</div>
//                 </div>
//               </div>
//               <div className="mt-3 space-y-1">
//                 <button
//                   onClick={handleLogout}
//                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;


// SECONF TRIAL

// 


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappNumber = '+2347063003993';
  const whatsappMessage = encodeURIComponent('Hello Blessing, I will be interested in your POS application, can we discuss further.');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col"> 
      {/* Navigation - Full width */}
      <nav className="bg-white shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">
                  StoreInventory
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user?.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => navigate('/admin')}
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => navigate('/sales')}
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Sales
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/sales')}
                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Sales Dashboard
                  </button>
                )}
              </div>
            </div>
            
            {/* Desktop user info */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden w-full">
            <div className="pt-2 pb-3 space-y-1">
              {user?.role === 'admin' ? (
                <>
                  <button
                    onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}
                    className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                  >
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => { navigate('/sales'); setIsMobileMenuOpen(false); }}
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                  >
                    Sales
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate('/sales'); setIsMobileMenuOpen(false); }}
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                >
                  Sales Dashboard
                </button>
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.role}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer - Full width */}
      <footer className="bg-gray-800 text-white py-4 sm:py-6 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} Developed by{' '}
                <span className="font-semibold text-indigo-300">Strakins Tech Hub</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <p className="text-xs sm:text-sm hidden sm:block">Get in touch:</p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white p-2 sm:p-3 rounded-full transition duration-200 flex items-center justify-center"
                title="Contact us on WhatsApp"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;