import { LeaderboardEntry } from '@/types/game';

// Firebase configuration - will use environment variables
const getFirebaseConfig = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
};

let firebaseInitialized = false;
let database: any = null;

/**
 * Initialize Firebase (lazy loading)
 */
async function initFirebase() {
  if (firebaseInitialized) return database;
  
  try {
    const config = getFirebaseConfig();
    if (!config || !config.apiKey) {
      console.warn('Firebase config not found. Using localStorage fallback.');
      return null;
    }

    const { initializeApp, getApps } = await import('firebase/app');
    const { getDatabase } = await import('firebase/database');

    if (!getApps().length) {
      initializeApp(config);
    }

    database = getDatabase();
    firebaseInitialized = true;
    return database;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
}

/**
 * Subscribe to realtime leaderboard updates
 * Falls back to localStorage if Firebase is not available
 */
export async function subscribeLeaderboard(
  callback: (entries: LeaderboardEntry[]) => void
): Promise<(() => void) | undefined> {
  try {
    const db = await initFirebase();
    
    if (!db) {
      // Fallback: load from localStorage once
      const { loadLeaderboard } = await import('./storage');
      const entries = loadLeaderboard();
      callback(entries);
      return undefined;
    }

    const { ref, onValue, query, orderByChild, limitToLast } = await import('firebase/database');
    
    const leaderboardRef = ref(db, 'leaderboard');
    const leaderboardQuery = query(
      leaderboardRef,
      orderByChild('score'),
      limitToLast(100)
    );

    const unsubscribe = onValue(leaderboardQuery, (snapshot) => {
      const data = snapshot.val() || {};
      const entries: LeaderboardEntry[] = Object.values(data);
      
      // Sort by score descending and assign ranks
      entries.sort((a, b) => b.score - a.score);
      entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });

      callback(entries);
    }, (error) => {
      console.error('Error listening to leaderboard:', error);
      // Fallback to localStorage on error
      import('./storage').then(({ loadLeaderboard }) => {
        callback(loadLeaderboard());
      });
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up leaderboard subscription:', error);
    
    // Fallback to localStorage
    const { loadLeaderboard } = await import('./storage');
    callback(loadLeaderboard());
    return undefined;
  }
}

/**
 * Submit score to realtime leaderboard
 * Falls back to localStorage if Firebase is not available
 */
export async function submitScore(entry: LeaderboardEntry): Promise<boolean> {
  try {
    const db = await initFirebase();
    
    if (!db) {
      // Fallback: save to localStorage
      const { updateLeaderboard } = await import('./storage');
      updateLeaderboard(entry);
      return true;
    }

    const { ref, set, serverTimestamp } = await import('firebase/database');
    
    const userRef = ref(db, `leaderboard/${entry.userId}`);
    await set(userRef, {
      ...entry,
      updatedAt: serverTimestamp(),
    });

    // Also save locally
    const { updateLeaderboard } = await import('./storage');
    updateLeaderboard(entry);

    return true;
  } catch (error) {
    console.error('Error submitting score:', error);
    
    // Fallback: save to localStorage
    try {
      const { updateLeaderboard } = await import('./storage');
      updateLeaderboard(entry);
      return true;
    } catch (fallbackError) {
      console.error('Failed to save score to localStorage:', fallbackError);
      return false;
    }
  }
}

/**
 * Get leaderboard once (not realtime)
 * Falls back to localStorage if Firebase is not available
 */
export async function getLeaderboardOnce(): Promise<LeaderboardEntry[]> {
  try {
    const db = await initFirebase();
    
    if (!db) {
      // Fallback: load from localStorage
      const { loadLeaderboard } = await import('./storage');
      return loadLeaderboard();
    }

    const { ref, get, query, orderByChild, limitToLast } = await import('firebase/database');
    
    const leaderboardRef = ref(db, 'leaderboard');
    const leaderboardQuery = query(
      leaderboardRef,
      orderByChild('score'),
      limitToLast(100)
    );

    const snapshot = await get(leaderboardQuery);
    const data = snapshot.val() || {};
    const entries: LeaderboardEntry[] = Object.values(data);
    
    // Sort by score descending and assign ranks
    entries.sort((a, b) => b.score - a.score);
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    // Fallback to localStorage
    const { loadLeaderboard } = await import('./storage');
    return loadLeaderboard();
  }
}

/**
 * Check if Firebase is configured and available
 */
export async function isFirebaseAvailable(): Promise<boolean> {
  const config = getFirebaseConfig();
  return !!(config && config.apiKey);
}

