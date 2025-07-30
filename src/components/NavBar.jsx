'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CartSidePanel from './CartSidePanel';
import { FiShoppingCart } from 'react-icons/fi';
import useCartStore from '@/store/cartStore';

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

   // Zustand store usage
  const { isCartOpen, openCart, closeCart, getTotalItems } = useCartStore();
  const cartItemsCount = getTotalItems();

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
    if (href === "/") return pathname === "/";
    const normalizedHref = href.startsWith('/') ? href : `/${href}`;
    return pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`);
  };

  return (
    <>
      <CartSidePanel isOpen={isCartOpen} onClose={closeCart} />
      <nav dir="rtl" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md py-3 border-b border-gray-800' : 'bg-gray-900/80 backdrop-blur-sm py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile Menu Button - Left side on mobile */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden z-50 focus:outline-none order-1"
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

          {/* Logo - Centered on mobile */}
          <Link href="/" className="z-50 order-2 md:order-none">
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

          {/* Cart Button - Right side on mobile */}
          <div className="relative order-3 md:order-last flex items-center">
            <button 
              onClick={openCart}
              className="relative p-1 text-gray-300 hover:text-yellow-400 transition-colors"
              aria-label="عرض سلة التسوق"
            >
              <FiShoppingCart size={22} className="relative z-0" />

              {/* Cart items count */}
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-0.5 bg-yellow-500 text-gray-900 text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center z-10">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Desktop Navigation - Center aligned with cart at end */}
          <div className="hidden md:flex items-center gap-8 ml-8 order-3 flex-1 justify-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative"
              >
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
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu (same as before) */}
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
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link 
                              href={link.path} 
                              className={`text-lg block w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                                isActive(link.path)
                                  ? 'text-yellow-400 bg-gray-800'
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {link.name}
                            </Link>
                          </motion.div>
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
    </>
    
  );
};

export default NavBar;