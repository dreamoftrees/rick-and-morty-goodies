import { NextRequest, NextResponse } from 'next/server';

// Define the protected and public routes
const protectedRoutes = ['/gallery', '/'];
const publicRoutes = ['/login'];

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // Get the session credentials
  const nameToken = request.cookies.get('name');
  const titleToken = request.cookies.get('title');
  const isAuthenticated = nameToken?.value && titleToken?.value;

  // Redirect to login if not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to first page of gallery
  if (isAuthenticated && request.nextUrl.pathname === '/gallery' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/gallery/1', request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
