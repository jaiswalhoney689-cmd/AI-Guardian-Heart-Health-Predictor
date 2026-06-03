import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Only initialize Firebase on the client side
let auth: any = null;

// Function to get or create auth instance (client-side only)
export function getAuthInstance() {
  // Skip initialization if running on server
  if (typeof window === 'undefined') {
    return null;
  }

  if (auth) {
    return auth;
  }

  // Verify required config exists
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn('Firebase API Key not configured');
    return null;
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  return auth;
}

// Export a lazy getter for auth
export function useFirebaseAuth() {
  if (typeof window === 'undefined') {
    return null;
  }
  return getAuthInstance();
}

// For backwards compatibility
export const auth = getAuthInstance();
