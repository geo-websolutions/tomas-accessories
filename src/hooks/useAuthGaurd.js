'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { supabase } from '@/lib/supabase'
import { onAuthStateChanged } from 'firebase/auth'

export function useAuthGuard(redirectPath = '/login') {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        
        // Check Firebase auth
        const firebaseUnsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!firebaseUser) {
            setIsAuthenticated(false)
            router.push(redirectPath)
            return
          }

          // Check Supabase auth
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error || !session) {
            setIsAuthenticated(false)
            router.push(redirectPath)
          } else {
            setIsAuthenticated(true)
          }
        })

        return () => firebaseUnsubscribe()
      } catch (error) {
        console.error('Auth check error:', error)
        router.push(redirectPath)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, redirectPath])

  return { isLoading, isAuthenticated }
}