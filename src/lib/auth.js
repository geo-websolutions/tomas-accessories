import { auth } from './firebase';
import { supabase } from './supabase';

export async function signOut() {
  try {
    // Sign out from Firebase
    await auth.signOut();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error };
  }
}