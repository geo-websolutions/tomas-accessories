'use client'
import { motion } from 'framer-motion'

export function LoadingSpinner({ fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen bg-gray-900' : 'py-12'}`}>
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="relative"
      >
        {/* Gold outer ring */}
        <div className="w-16 h-16 border-4 border-yellow-500/30 rounded-full absolute inset-0"></div>
        
        {/* Spinning element */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 relative"
        >
          {/* Silver segment */}
          <div className="w-4 h-4 bg-gray-300 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_2px_rgba(236,201,75,0.6)]"></div>
          
          {/* Gold segment */}
          <div className="w-4 h-4 bg-yellow-500 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-[0_0_8px_2px_rgba(236,201,75,0.8)]"></div>
        </motion.div>
        
        {/* Center gem effect */}
        <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_2px_rgba(236,201,75,0.3)]"></div>
      </motion.div>
      
      {/* Optional loading text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-gray-300 text-sm font-light ml-4"
      >
        جاري التحميل...
      </motion.p>
    </div>
  )
}