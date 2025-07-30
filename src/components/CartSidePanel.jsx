'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import useCartStore from '@/store/cartStore';
import { useEffect } from 'react';

const CartSidePanel = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotal 
  } = useCartStore();

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 right-auto w-full max-w-md bg-gray-900 shadow-xl z-[9999] overflow-y-auto"
            dir="rtl"
          >
            <div className="p-4 h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-yellow-400">سلة التسوق</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="py-4 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">سلة التسوق فارغة</p>
                ) : (
                  cartItems.map(item => (
                    <div key={`${item.id}-${item.quantity}`} className="flex gap-4 border-b border-gray-800 pb-4">
                      <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-yellow-400 text-sm">{item.price} ج.م × {item.quantity}</p>
                        <p className="text-gray-300 text-sm">المجموع: {item.price * item.quantity} ج.م</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center border border-gray-600 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 text-gray-400 hover:text-white"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-2 text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 text-gray-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 mt-2"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">المجموع الكلي:</span>
                    <span className="text-yellow-400 font-bold">{getTotal()} ج.م</span>
                  </div>
                  <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors">
                    إتمام الشراء
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidePanel;