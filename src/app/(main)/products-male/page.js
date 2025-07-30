'use client';

import { useEffect, useState, useMemo } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { LiaCartPlusSolid } from "react-icons/lia";
import FilterSidePanel from "@/components/FilterSidePanel";
import { useProductFilters } from "@/hooks/useProductFilter";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if the user is on a touch device
  useEffect(() => {
    // More comprehensive touch detection
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
    
    // Update on resize (for emulation changes)
    const handleResize = () => {
      setIsTouchDevice(checkTouchDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("subcategory", "==", "male"),
          limit(20)
        );
        
        const querySnapshot = await getDocs(q);
        
        const productsData = [];
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          
          // Translate category to Arabic
          const arabicCategories = {
            bracelet: "اساور",
            necklace: "سلاسل",
            ring: "خواتم",
            earring: "حلقان",
            watch: "ساعات"
          };
          
          // Create new product object with translated category
          const productWithArabicCategory = {
            id: doc.id,
            ...productData,
            category: arabicCategories[productData.category] || productData.category
          };
          
          productsData.push(productWithArabicCategory);
        });

        // Sort by createdAt (newest first)
        productsData.sort((a, b) => b.createdAt - a.createdAt);
        
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  

  // Toggle filter panel on mobile
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Filter products:
  const filteredProducts = useProductFilters(products, selectedCategories, priceRange);

  console.log("Filtered products:", filteredProducts);
  
  // Loading state
  if (loading) {
    return (
      <main lang='ar' dir="rtl" className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-yellow-500 text-xl">جاري التحميل...</div>
      </main>
    );
  }

  return (
    <main lang='ar' dir="rtl" className="bg-gray-950 text-white font-sans overflow-x-hidden min-h-screen">
      {/* Filter Button (Mobile) */}
      <div className="lg:hidden px-6 mt-10 pt-10">
        <button 
          onClick={toggleFilter}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-yellow-400"
        >
          <FiFilter />
          تصفية
        </button>
      </div>

      <div className="flex flex-row-reverse mt-10 relative">
        {/* Products Showcase */}
        <section className="flex-1 py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900 lg:mr-80">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl text-center font-bold mb-20"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300">
              تشكيلاتنا الفاخرة
            </span>
          </motion.h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              لا توجد منتجات متاحة حالياً
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="group relative bg-gray-800 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 rounded-lg overflow-hidden"
                >
                  {/* Whole card is clickable */}
                  <a href={`/products/${product.id}`} className="block h-full">
                    {/* Discount Ribbon */}
                    {product.hasDiscount && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full font-bold text-xs z-10 rotate-12 shadow-lg">
                        خصم {product.discountPercentage}%
                      </div>
                    )}

                    {/* Product Image - 3:4 aspect ratio */}
                    <div className="relative w-full pt-[133.33%] overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent"></div>
                      
                      {/* Add to Cart Button - Appears on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          className={`absolute right-2 bottom-2 p-2 bg-yellow-600 text-gray-900 rounded-full transition-all duration-300 z-10 ${isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} md:opacity-100 sm:opacity-100 hover:bg-yellow-500 hover:scale-110'}`}
                          onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic here
                          }}
                        >
                          <LiaCartPlusSolid size={24} />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg font-semibold text-white mb-1 flex items-center"
                      >
                        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                        {product.name}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-xs mb-3 leading-relaxed line-clamp-2"
                      >
                        {product.description}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-between"
                      >
                        <div>
                          {product.hasDiscount ? (
                            <>
                              <span className="text-gray-400 text-xs line-through mr-1">
                                {product.price} ج.م
                              </span>
                              <span className="text-yellow-400 font-bold text-sm">
                                {product.discountPrice} ج.م
                              </span>
                            </>
                          ) : (
                            <span className="text-yellow-400 font-bold text-sm">
                              {product.price} ج.م
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </a>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 group-hover:animate-shine transition-all duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Filter Side Panel - Desktop */}
        <div className="hidden lg:block fixed top-20 right-0 h-screen w-80 p-6 overflow-y-auto">
          <FilterSidePanel 
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-80 bg-gray-900 p-6 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-yellow-400">تصفية المنتجات</h3>
                <button 
                  onClick={toggleFilter}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              <FilterSidePanel 
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              <div className="mt-6">
                <button 
                  onClick={toggleFilter}
                  className="w-full py-3 bg-yellow-600 text-gray-900 font-bold rounded-lg"
                >
                  تطبيق الفلتر
                </button>
              </div>
            </motion.div>
            {/* Overlay for mobile filter */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleFilter}
            />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}