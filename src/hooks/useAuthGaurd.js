'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { supabase } from '@/lib/supabase'
import { onAuthStateChanged } from 'firebase/auth'

export function useAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Firebase auth
        const firebaseUnsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!firebaseUser) {
            router.push('/login')
            return
          }

          // Check Supabase auth
          const { data: { session }, error } = await supabase.auth.getSession()
          
          if (error || !session) {
            router.push('/login')
          }
        })

        return () => firebaseUnsubscribe()
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])
}