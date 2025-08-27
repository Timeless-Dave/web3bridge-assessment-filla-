import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useNavigation = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if browser supports back navigation
    if (typeof window !== 'undefined') {
      setCanGoBack(window.history.length > 1);
      
      // Listen for navigation changes
      const handlePopState = () => {
        setCanGoBack(window.history.length > 1);
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const goBack = () => {
    if (typeof window !== 'undefined' && canGoBack) {
      router.back();
    } else {
      // Fallback to home page
      router.push('/');
    }
  };

  const goHome = () => {
    router.push('/');
  };

  const goToGame = () => {
    router.push('/');
  };

  const goToLeaderboard = () => {
    router.push('/leaderboard');
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  return {
    goBack,
    goHome,
    goToGame,
    goToLeaderboard,
    goToProfile,
    canGoBack,
    router,
  };
};
