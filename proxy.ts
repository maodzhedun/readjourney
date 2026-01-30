import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/recommended', '/library', '/reading'];
const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Unauthorised user on a private router
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Authorised user on public route (login/register)
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/recommended', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/recommended/:path*',
    '/library/:path*',
    '/reading/:path*',
    '/login',
    '/register',
  ],
};
