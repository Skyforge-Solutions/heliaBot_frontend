import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For UI development, we'll allow all routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:id', '/api/:path*', '/login', '/register'],
};
