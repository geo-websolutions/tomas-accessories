'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const navLinks = [
  //   { name: 'الرئيسية', path: '/' },
  //   { 
  //     name: 'المنتجات', 
  //     path: '/products',
  //     subItems: [
  //       { name: 'القلادات', path: '/products/necklaces' },
  //       { name: 'الخواتم', path: '/products/rings' },
  //       { name: 'الأقراط', path: '/products/earrings' },
  //       { name: 'الأساور', path: '/products/bracelets' }
  //     ]
  //   },
  //   { name: 'تواصل معنا', path: '/contact' }
  // ];

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'للنساء', path: 'products-female' },
    { name: 'للرجال', path: 'products-male' },
    { name: 'تواصل معنا', path: '/contact' }
  ];

  const isActive = (href) => {
    // Special case for home page
    if (href === "/") {
      return pathname === "/";
    }
    
    // For other paths, check if current path matches or starts with the href
    // Also handle the case where pathname might have a leading slash
    const normalizedHref = href.startsWith('/') ? href : `/${href}`;
    return pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`);
  };
  return (
    <nav dir="rtl" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md py-3 border-b border-gray-800' : 'bg-gray-900/80 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="z-50">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Image 
              src="/assets/icons/logo.png" 
              alt="توماس للإكسسوارات" 
              width={500}
              height={200}
              className="w-auto h-10"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
              onMouseEnter={() => link.subItems && setProductsOpen(true)}
              onMouseLeave={() => link.subItems && setProductsOpen(false)}
            >
              {link.subItems ? (
                <>
                  <button 
                    className={`relative group px-2 py-1 flex items-center ${
                      isActive(link.path, link.subItems) 
                        ? 'text-yellow-400 bg-gray-800 rounded-lg' 
                        : 'text-gray-300 hover:text-yellow-400'
                    } transition-colors duration-300`}
                    onClick={() => setProductsOpen(!productsOpen)}
                  >
                    {link.name}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 mr-1 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className={`absolute right-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                      isActive(link.path, link.subItems) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>

                  <AnimatePresence>
                    {productsOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-700"
                      >
                        {link.subItems.map((subItem) => (
                          <motion.li 
                            key={subItem.path}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              href={subItem.path}
                              className={`block px-4 py-2 transition-colors duration-200 ${
                                pathname === subItem.path || pathname.startsWith(`${subItem.path}/`)
                                  ? 'text-yellow-400 bg-gray-700'
                                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700'
                              }`}
                              onClick={() => setProductsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link 
                  href={link.path} 
                  className={`relative group px-2 py-1 ${
                    isActive(link.path) 
                      ? 'text-yellow-400 bg-gray-800 rounded-lg' 
                      : 'text-gray-300 hover:text-yellow-400'
                  } transition-colors duration-300`}
                >
                  {link.name}
                  <span className={`absolute right-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden z-50 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-yellow-400 mb-1.5"
            ></motion.span>
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-yellow-400 mb-1.5"
            ></motion.span>
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-yellow-400"
            ></motion.span>
          </div>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 100 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg md:hidden"
              dir="rtl"
            >
              <div className="h-full pt-20 pb-8 flex flex-col items-center">
                <div className="w-full px-6 flex-1 flex flex-col items-center justify-center bg-gray-600 py-3">
                  <div className="space-y-4 w-full max-w-md">
                    {navLinks.map((link) => (
                      <div key={link.path} className="w-full">
                        {link.subItems ? (
                          <div className="mb-2">
                            <button 
                              onClick={() => setProductsOpen(!productsOpen)}
                              className={`text-2xl w-full px-4 py-3 flex items-center justify-center rounded-lg transition-colors duration-300 ${
                                isActive(link.path, link.subItems)
                                  ? 'text-yellow-400 bg-gray-800'
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                            >
                              {link.name}
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 mr-2 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {productsOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-col space-y-2 mt-2 pr-4 border-r-2 border-yellow-500/30">
                                    {link.subItems.map((subItem) => (
                                      <motion.div
                                        key={subItem.path}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                      >
                                        <Link
                                          href={subItem.path}
                                          className={`block py-2 px-4 text-right rounded-lg transition-colors duration-200 ${
                                            pathname === subItem.path || pathname.startsWith(`${subItem.path}/`)
                                              ? 'text-yellow-400 bg-gray-800'
                                              : 'text-gray-400 hover:text-yellow-400'
                                          }`}
                                          onClick={() => {
                                            setIsOpen(false);
                                            setProductsOpen(false);
                                          }}
                                        >
                                          {subItem.name}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link 
                              href={link.path} 
                              className={`text-2xl block w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                                isActive(link.path)
                                  ? 'text-yellow-400 bg-gray-800'
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {link.name}
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;