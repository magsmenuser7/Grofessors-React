import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../assets/logos/grofessors-logo.png";
import newlogo from "../assets/logos/grofesion-new-logo.jpeg"
import grofesionlogo from "../assets/logos/new-grofesion.jpeg"

import grofesion from "../assets/logos/grofesion.png"


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const ecosystemItems = [
  //   { name: 'Magsmen', path: '/ventures/magsmen', description: 'Brand Consulting' },
  //   { name: 'InTalks', path: '/ventures/intalks', description: 'Podcast' },
  //   { name: 'MIbbs', path: '/ventures/mibbs', description: 'Brand Budgeting' },
  //   { name: 'School of Strategy', path: '/ventures/school-of-strategy', description: 'Brand Lab' },
  //   { name: 'SanStrategies', path: '/ventures/sanstrategies', description: 'Advisory' },
  //   { name: 'Gamanam', path: '/ventures/gamanam', description: 'Community' }
  // ];


    const ecosystemItems = [
    { name: 'Magsmen', path: 'https://magsmen.com/', description: 'Brand Consulting' },
    { name: 'InTalks', path: 'https://intalks.in/', description: 'Podcast' },
    { name: 'MIbbs', path: 'https://mibbs.ai/', description: 'Brand Budgeting' },
    { name: 'School of Strategy', path: 'https://schoolofstrategy.magsmen.com/', description: 'Brand Lab' },
    { name: 'SanStrategies', path: 'https://sanstrategies.com/', description: 'Advisory' },
    { name: 'Gamanam', path: 'https://youtube.com/@gamanambyrs?si=XO77nsVmDygwZreP', description: 'Community' }
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ecosystem', path: '/ecosystem', hasDropdown: true },
    { name: 'Insights', path: '/insights' },
    { name: 'Contact', path: '/contact', isButton: true }
  ];

  return (
    <motion.header
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md   ${
        isScrolled ? 'shadow-md bg-white z-50' : 'bg-transparent'
      }py-6`}
      initial={{ y: -100 }}
      animate={{ y:0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={grofesion}
              alt="Grofesion Logo"
              className="w-48 h-20 object-contain rounded-lg"
            />
            {/* <div className="w-10 h-10 bg-[#F15A29] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">G</span>
              <img src={Logo} alt="Grofessors Logo" className="w-full h-10 rounded-lg" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Grofessors</span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsEcosystemOpen(true)}
                    onMouseLeave={() => setIsEcosystemOpen(false)}
                  >
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-[#F15A29] transition-colors duration-300 group">
                      <span className="relative">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15A29] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {isEcosystemOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-gray-100 border border-[#675F5D] rounded-lg shadow-xl"
                        >
                          <div className="py-2">
                            {ecosystemItems.map((ecosystemItem) => (
                              <Link
                                key={ecosystemItem.name}
                                to={ecosystemItem.path}
                                className="block px-4 py-3 hover:bg-[#675F5D]/20 transition-colors duration-200"
                              >
                                <div className="text-black font-medium">{ecosystemItem.name}</div>
                                <div className="text-[#675F5D] text-sm">{ecosystemItem.description}</div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.isButton ? (
                  <Link
                    to={item.path}
                    className="px-6 py-2 border-2 border-gray-500 text-gray-500 hover:bg-[#F15A29] hover:border-[#F15A29] hover:text-black transition-all duration-300 rounded-full font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-gray-500 hover:text-[#F15A29] transition-colors duration-300 relative group ${location.pathname === item.path ? 'text-[#F15A29]' : ''
                      }`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F15A29] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </nav>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#F15A29] transition-colors duration-300 z-50 bg-gray-500"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-gray-500"
            >
              <nav className=" p-3 py-4 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <Link
                          to={item.path}
                          className="block text-white hover:text-[#F15A29] bg-gray-200 transition-colors duration-300 py-2 z-50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="ml-4 mt-2 space-y-2">
                          {ecosystemItems.map((ecosystemItem) => (
                            <Link
                              key={ecosystemItem.name}
                              to={ecosystemItem.path}
                              className="block text-[#fff] hover:text-white transition-colors duration-300 py-1 z-50"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {ecosystemItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`block py-2 transition-colors duration-300 ${item.isButton
                            ? 'text-[#F15A29] font-medium'
                            : 'text-white hover:text-[#F15A29]'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;