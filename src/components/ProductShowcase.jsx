'use client';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LiaCartPlusSolid } from "react-icons/lia";
import useCartStore from '@/store/cartStore';

export default function ProductShowcase({ products }) {
  const { addToCart, openCart } = useCartStore();

  // Define responsive image sizes (adjust based on your layout)
  const imageSizes = `
    (max-width: 640px) 100vw,
    (max-width: 768px) 50vw,
    (max-width: 1024px) 33vw,
    25vw
  `;

  return (
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

      {products.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          لا توجد منتجات متاحة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
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
              <a href={`/products/${product.id}`} className="block h-full">
                {product.hasDiscount && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full font-bold text-xs z-10 rotate-12 shadow-lg">
                    خصم {product.discountPercentage}%
                  </div>
                )}

                <div className="relative w-full pt-[133.33%] overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes={imageSizes}
                    priority={index < 4}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                  />
                  
                  <button 
                    className={`absolute right-2 bottom-2 p-2 bg-yellow-600 text-gray-900 rounded-full transition-all duration-300 z-10 opacity-100 md:opacity-0 group-hover:md:opacity-100 hover:bg-yellow-500 hover:scale-110`}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.hasDiscount ? product.discountPrice : product.price,
                        imageUrl: product.imageUrl
                      });
                      openCart();
                    }}
                  >
                    <LiaCartPlusSolid size={24} />
                  </button>
                </div>

                <div className="p-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-semibold text-white mb-1 flex items-center"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></span>
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
                          <span className="text-gray-400 text-xs line-through ml-1">
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
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}