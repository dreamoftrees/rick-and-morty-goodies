import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/gallery/:path*'],
};

export function middleware(request: NextRequest) {

  // TODO: Refactor this middleware into a composable function
  const nameToken = request.cookies.get('name');
  const titleToken = request.cookies.get('title');
  if (nameToken?.value && nameToken?.value.length > 0 && titleToken?.value && titleToken?.value.length > 0) {
    return NextResponse.next();
  } else {
    // If the cookie does not exist, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
