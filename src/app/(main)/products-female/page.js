'use client';

import { useEffect, useState } from "react";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { useProductFilters } from "@/hooks/useProductFilter";
import FilterSidePanel from "@/components/FilterSidePanel";
import ProductShowcase from "@/components/ProductShowcase";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const q = query(
          productsRef,
          where("subcategory", "==", "female"),
          limit(20)
        );
        
        const querySnapshot = await getDocs(q);
        
        const productsData = [];
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          
          const arabicCategories = {
            bracelet: "اساور",
            necklace: "سلاسل",
            ring: "خواتم",
            earring: "حلقان",
            watch: "ساعات"
          };
          
          const productWithArabicCategory = {
            id: doc.id,
            ...productData,
            category: arabicCategories[productData.category] || productData.category
          };
          
          productsData.push(productWithArabicCategory);
        });

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

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  const filteredProducts = useProductFilters(products, selectedCategories, priceRange);

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
        <ProductShowcase products={filteredProducts} />

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