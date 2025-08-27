import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl;
  
  // Define valid routes
  const validRoutes = [
    '/',
    '/game',
    '/game/results',
    '/leaderboard', 
    '/profile'
  ];

  // Check if it's a valid route or starts with valid route patterns
  const isValidRoute = validRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });

  // Check for API routes, static files, or Next.js internal routes
  const isSystemRoute = pathname.startsWith('/_next') || 
                       pathname.startsWith('/api') || 
                       pathname.includes('.') ||
                       pathname.startsWith('/__nextjs_original-stack-frame');

  // If it's not a valid route and not a system route, it should trigger 404
  if (!isValidRoute && !isSystemRoute) {
    // Let Next.js handle the 404 through not-found.tsx
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
