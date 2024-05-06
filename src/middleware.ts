import { NextRequest, NextResponse } from 'next/server';

// Define the protected routes
const protectedRoutes = ['/gallery', '/gallery/*', '/'];

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((routeRule) => matchPath(path, routeRule));

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

// Function to match path with route rule with wildcards
function matchPath(path: string, routeRule: string): boolean {
  const pathParts = path.split('/');
  const routeParts = routeRule.split('/');

  // If the number of parts doesn't match, it's not a match
  if (pathParts.length !== routeParts.length) {
    return false;
  }

  for (let i = 0; i < pathParts.length; i++) {
    const pathPart = pathParts[i];
    const routePart = routeParts[i];

    // If the route part is a wildcard '*', it matches anything
    if (routePart === '*') {
      continue;
    }

    // If the route part is not a wildcard and doesn't match the path part, it's not a match
    if (pathPart !== routePart) {
      return false;
    }
  }

  // All parts match, it's a match
  return true;
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
