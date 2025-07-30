'use client'
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/authSingOut';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const { success } = await signOut();
    
    if (success) {
      router.push('/login');
      router.refresh(); // Ensure client cache is cleared
    } else {
      setIsLoading(false);
      // Show error toast
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-red-900/50 hover:border-red-500 transition-colors"
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          جاري تسجيل الخروج...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          تسجيل الخروج
        </>
      )}
    </motion.button>
  );
}