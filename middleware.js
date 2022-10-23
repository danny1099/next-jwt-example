import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const cookieStored = request.cookies.get('tokenId');

  try {
    await jwtVerify(cookieStored, new TextEncoder().encode('secret'));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
